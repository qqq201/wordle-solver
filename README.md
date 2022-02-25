# Wordle Solver

A [Wordle](https://www.nytimes.com/games/wordle/index.html) solver using Shannon Entropy motivated by [3Blue1Brown](https://www.youtube.com/watch?v=v68zYyaEmEA) with the updated word list including 12947 valid guesses and 2309 possible answers.

## Functionalities
The solver has 2 options:

- Using 2309 possibile answers with a uniform distribution
![](https://github.com/qqq201/wordle-solver/blob/main/demo/demo2309.gif)
- Using 12947 valid words with refined relative frequency\
![](https://github.com/qqq201/wordle-solver/blob/main/demo/demo12947.gif)\
The relative frequency of each words is fetched from [Google Books Ngram Viewer](https://books.google.com/ngrams) and taken the average from 2010 to 2019.\
Top 4000 words will be considered as more common words and more likely to be the answer. Hence, the possibility of these words will be ranged from 50% to 98% acquired through the sigmoid function.


## Install and deploy
### Server
- `npm i`: Installs required packages

- `npm start`: Runs the server

### Client
- `npm i`: Installs required packages

- `npm start`: Runs the application. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload if you make edits.
