import word_list from './wordlist.js'

class Wordle {
    constructor() {
        this.possible_words = word_list.slice(0, 2309)
        this.patterns = []
        fetch('./test.json').then(response => response.json()).then(data => this.patterns = data)
    }

    restart() {
        this.possible_words = word_list.slice(0, 2309)
    }

    getPossibleWords() {
        var sorted_list = this.possible_words
        sorted_list.sort()

        return sorted_list.map((word, i) => {
            return {
                id: i + 1,
                word: word
        }});
    }

    calInfoGain(guess) {
        var count = {}

        this.possible_words.forEach((word, _) => {
            var pattern = this.patterns[guess][word]

            if (pattern in count)
                count[pattern]++
            else
                count[pattern] = 1
        })

        var info_gain = 0

        Object.values(count).forEach((value, _) => {
            const p = value / this.possible_words.length
            info_gain -= p * Math.log2(p)
        })

        return info_gain
    }

    getTopAnswers() {
        if (this.patterns.length === 0)
            return []

        if (this.possible_words.length === 1)
            return [{
                id: 1,
                word: this.possible_words[0],
                info_gain: 0
            }]

        var info_gains = [];
        for (let i = 0; i < 2309; i++){
            info_gains.push([i, this.calInfoGain(word_list[i], this.possible_words)]);
        }

        info_gains.sort(function(a, b) {
            return b[1] - a[1];
        });

        return info_gains.map((item, i) => {
            return {
                id: i + 1,
                word: word_list[item[0]],
                info_gain: item[1].toFixed(2)
        }});
    }

    encode(pattern) {
        const map = {
            "B": 0,
            "Y": 1,
            "G": 2
        }

        var value = 0

        for (let i = 0; i < 5; i++){
            value += map[pattern[i]] * Math.pow(3, i)
        }

        return value
    }

    filterPossibleWords(guess, pattern) {
        return this.possible_words.filter(word => {
            if (this.patterns[guess][word] === this.encode(pattern))
                return true
            return false
        });
    }

    validateGuess(guess, pattern) {
        // check if a guess is valid
        // -1: not a 5 letter word
        // 0: not in the word list
        // 1: invalid guess or pattern
        // 2: valid

        if (guess.length !== 5)
            return -1
        else if (word_list.includes(guess)){
            const remaining = this.filterPossibleWords(guess, pattern)
            if (remaining.length > 0){
                this.possible_words = remaining
                return 2
            }
            else
                return 1
        }
        else
            return 0
    }
}

export default new Wordle()
