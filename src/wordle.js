import word_list from './wordlist.js'

var answer = word_list[Math.floor(Math.random() * (word_list.length - 1))]

export const generateWord = () => {
    answer = word_list[Math.floor(Math.random() * (word_list.length - 1))]
}

export const evaluateGuess = (guess) => {
    console.log(guess)
    if (guess.length < 5)
        return -1
    else if (word_list.includes(guess))
        return 1
    else
        return 0
}

export const getStatus = (word) => {
    var results = []

    for(let i = 0; i < 5; i++){
        if (word[i] === answer[i])
            results.push('correct')
        else if (answer.includes(word[i]))
            results.push('present')
        else
            results.push('absent')
    }
    return results
}
