const word_list = require('./wordlist.js')
const n = word_list.length

const pow3 = [1, 3, 9, 27, 81]
const map = {
    "B": 0,
    "Y": 1,
    "G": 2
}

const evaluate = (word, answer) => {
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

const encode = (pattern) => {
    var value = 0

    for (let i = 0; i < 5; i++){
        value += map[pattern[i]] * pow3[i]
    }

    return value
}

const findPatterns = () => {
    var patterns = {}
    for(let i = 0; i < n; i++){
        patterns[word_list[i]] = {}
        for (let j = 0; j < n; j++){
            patterns[word_list[i]][word_list[j]] = encode(evaluate(word_list[i], word_list[j]))
        }
    }

    return patterns
}

const calEntropy = (word, possible_answers) => {
    var count = {}

    for(let i = 0; i < possible_answers.length; i++){
        var pattern = evaluate(word, possible_answers[i])

        if (pattern in count)
            count[pattern]++
        else
            count[pattern] = 1
    }

    var info_gain = 0

    Object.values(count).forEach((value, _) => {
        const p = value / possible_answers.length
        info_gain -= p * Math.log2(p)
    });

    return info_gain
}

const filterPossibleWords = (guess, pattern, possible_words) => {
    return possible_words.filter(word => {
        if (patterns[guess][word] === encode(pattern))
            return true
        return false
    });
}
const getTopAnswers = (possible_answers) => {
    var test = {}
    if (possible_answers.length === 1){
        test[possible_answers[0]] = 0
        return test
    }

    var info_gains = [];
    for (let i = 0; i < word_list.length; i++){
        info_gains.push([i, calEntropy(word_list[i], possible_answers)]);
    }

    info_gains.sort(function(a, b) {
        return b[1] - a[1];
    })

    info_gains.forEach((item, i) => {
        test[word_list[item[0]]] = item[1]
    })

    return test
}

const simulation = () => {
    const solution = word_list[Math.floor(Math.random() * 2309)]
    var possible_words = word_list.slice(0, n)
    var win = false

    for (let i = 0; i < 6 && !win; i++){
        var best_word = ""
        if (possible_words.length > 1){
            var entropies = [];
            for (let i = 0; i < n; i++){
                entropies.push([word_list[i], calEntropy(word_list[i], possible_words)]);
            }

            entropies.sort(function(a, b) {
                return b[1] - a[1];
            });

            best_word = entropies[0][0]
        }
        else if (possible_words.length === 1)
            best_word = possible_words[0]

        const pattern = evaluate(best_word, solution)

        console.log(possible_words.length)
        console.log('-----------------')
        console.log('Guess: ' + best_word)
        console.log('Result: ' + pattern)

        if (best_word === solution)
            win = true

        possible_words = filterPossibleWords(best_word, pattern, possible_words)
    }

    console.log(possible_words)
}
const FileSystem = require("fs");
   FileSystem.writeFile('./test.json', JSON.stringify(getTopAnswers(word_list)), (error) => {
        if (error) throw error;
});
