import fs from 'fs'

var word_list = fs.readFileSync('sorted_words_by_freq.txt').toString().split("\n")
const sigmoid = (x) => 1 / (1 + Math.E ** (-x))

const possibility = {}
word_list.forEach((word, i) => {possibility[word] = sigmoid((4000 - i) * 4 / 4000)})
fs.writeFile('./possbility.json', JSON.stringify(possibility), (error) => {
   if (error) throw error;
})
