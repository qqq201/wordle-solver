import word_list from './wordlist.js'

class Wordle {
    constructor() {
        this.possible_answers = word_list
    }

    restart() {
        this.possible_answers = word_list
    }

    evaluate(word, answer) {
        var results = ['B', 'B', 'B', 'B', 'B']
        var visited = [false, false, false, false, false]

        // find correct letters
        for(let i = 0; i < 5; i++){
            if (word[i] === answer[i]){
                results[i] = 'G'
                visited[i] = true
            }
        }

        // find present letters
        for (let i = 0; i < 5; i++){
            if (results[i] !== 'G'){
                for (let j = 0; j < 5; j++) {
                    if (answer[j] === word[i] && !visited[j]) {
                        results[i] = 'Y'
                        visited[j] = true
                        break
                    }
                }
            }
        }

        return results.join("")
    }

    getPossibleAnswers() {
        var sorted_list = this.possible_answers
        sorted_list.sort()

        return sorted_list.map((word, i) => {
            return {
                id: i + 1,
                word: word
            }
        })
    }

    calEntropy(guess) {
        var count = {}

        this.possible_answers.forEach((word, _) => {
            var pattern = this.evaluate(guess, word)

            if (pattern in count)
                count[pattern]++
            else
                count[pattern] = 1
        })

        var entropy = 0

        Object.values(count).forEach((value, _) => {
            const p = value / this.possible_answers.length
            entropy -= p * Math.log2(p)
        })

        return entropy
    }

    getTopAnswers() {
        if (this.possible_answers.length === 1){
            return [{
                id: 1,
                word: this.possible_answers[0],
                entropy: 0
            }]
        }

        var info_gains = [];
        for (let i = 0; i < word_list.length; i++){
            info_gains.push([i, this.calEntropy(word_list[i], this.possible_answers)]);
        }

        info_gains.sort(function(a, b) {
            return b[1] - a[1];
        })

        return info_gains.map((item, i) => {
            return {
                id: i + 1,
                word: word_list[item[0]],
                entropy: item[1].toFixed(2)
            }
        })
    }

    filterPossibleWords(guess, pattern) {
        return this.possible_answers.filter(word => {
            if (this.evaluate(guess, word) === pattern)
                return true
            return false
        })
    }

    validateGuess(guess, pattern) {
        // -1: not a 5 letter word
        // 0: not in the word list
        // 1: invalid guess or pattern
        // 2: valid

        if (guess.length !== 5)
            return -1
        else if (word_list.includes(guess)){
            const remaining = this.filterPossibleWords(guess, pattern)
            if (remaining.length > 0){
                this.possible_answers = remaining
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
