import fs from 'fs'

const sum = (array) => array.reduce((a, b) => a + b)

class Wordle {
    constructor() {
        this.word_list = fs.readFileSync('./utils/words.txt').toString().split("\n")
        this.word_list.splice(-1)
        this.possible_answers = []
        this.possibility = fs.readFileSync('./utils/possibility.json')
        this.possibility = JSON.parse(this.possibility)
        this.mode = "2309"
        this.total_possibility = 0
    }

    setMode(mode) {
        this.mode = mode
    }

    calTotalPossibility() {
        this.total_possibility = sum(this.possible_answers.map((word, _) => this.possibility[word]))
    }

    restart() {
        if (this.mode === "12947")
            this.possible_answers = this.word_list
        else if (this.mode === "2309")
            this.possible_answers = this.word_list.slice(0, 2309)

        this.calTotalPossibility()
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

    getProbability(word) {
        if (this.mode === "2309"){
            return 1 / this.possible_answers.length
        }
        else {
            return this.possibility[word] / this.total_possibility
        }
    }

    getPossibleAnswers() {
        return this.possible_answers.map((word, _) => {
            return {
                word: word,
                probability: this.getProbability(word).toFixed(5)
            }
        })
    }

    calEntropy(guess) {
        var p = {}

        this.possible_answers.forEach((word, _) => {
            var pattern = this.evaluate(guess, word)

            if (pattern in p)
                p[pattern] += this.getProbability(word)
            else
                p[pattern] = this.getProbability(word)
        })

        var entropy = 0

        Object.values(p).forEach((value, _) => {
            entropy -= value * Math.log2(value)
        })

        return entropy
    }

    getTopAnswers() {
        if (this.possible_answers.length === 1){
            return [{
                word: this.possible_answers[0],
                entropy: 0,
                probability: 1
            }]
        }
        else {
            const sorted_list = [...this.word_list]
            sorted_list.sort()
            return sorted_list.map((word, _) => {
                return {
                    word: word,
                    entropy: this.calEntropy(word).toFixed(2),
                    probability: this.possible_answers.includes(word) ? this.getProbability(word).toFixed(5) : 0
                }
            })
        }
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
        else if (this.word_list.includes(guess)){
            const remaining = this.filterPossibleWords(guess, pattern)
            if (remaining.length > 0){
                this.possible_answers = remaining
                this.calTotalPossibility()
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
