import XMLHttpRequest from "xmlhttprequest"
import fs from 'fs'

const word_list = fs.readFileSync('words.txt').toString().split("\n")

function makeRequest(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest.XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                })
            }
        }
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            })
        }
        xhr.send();
    })
}

const average = (array) => array.reduce((a, b) => a + b) / array.length;

var freq = {}

const notfound_words = [
  'avyze', 'awdls', 'azygy', 'boygs', 'byked', 'byrls',
  'daych', 'dorbs', 'dsobo', 'dsomo', 'durgy', 'dzhos',
  'eevns', 'egmas', 'ennog', 'erevs', 'euked', 'evhoe',
  'ewked', 'gowfs', 'hiois', 'humfs', 'hwyls', 'jarps',
  'jokol', 'kerky', 'khafs', 'koaps', 'kophs', 'kuzus',
  'mausy', 'nabks', 'odyls', 'omovs', 'pebas', 'peeoy',
  'peghs', 'phpht', 'poupt', 'pyins', 'qapik', 'qophs',
  'ryked', 'sdayn', 'skyfs', 'skyrs', 'snebs', 'sohur',
  'sowfs', 'syped', 'takky', 'tiyns', 'uraos', 'viffs',
  'voema', 'voips', 'vutty', 'wembs', 'whyda', 'wudus',
  'xysts', 'yaffs', 'yarco', 'yesks', 'ylems', 'ylkes',
  'yrivd', 'zedas', 'zexes', 'zimbs'
]

notfound_words.forEach((word, _) => {
    freq[word] = 0
})

const findfreq = async () => {
    for (let start = 0; start < 12013; start += 1001) {
        const end = Math.min(start + 1000, 12946)
        var query = ""

        for (let i = start; i < end; i++){
            query += word_list[i] + "%2C";
        }

        query += word_list[end];

        var url = "https://books.google.com/ngrams/json?content=" + query + "&year_start=2010&year_end=2019&corpus=26&smoothing=3"

        try {
            var res = await makeRequest(url)
            if (res) {
                res = JSON.parse(res)

                res.forEach((word, i) => {
                    freq[word["ngram"]] = average(word["timeseries"])
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

findfreq().then(() => {
    fs.writeFile('./frequency.json', JSON.stringify(freq), (error) => {
       if (error) throw error;
    })

    var sorted_list = Object.keys(freq).map((word, _) => [word, freq[word]])

    sorted_list.sort((a, b) => {
        return b[1] - a[1]
    })

    sorted_list = sorted_list.map((word, _) => word[0])

    fs.writeFile('./sorted_words_by_freq.txt', sorted_list.map((word, _) => return word[0]).join('\n'), (error) => {
       if (error) throw error;
    })
})
