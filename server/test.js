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
