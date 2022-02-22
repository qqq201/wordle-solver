import express from 'express';
import cors from 'cors'
import morgan from 'morgan'
import Wordle from './wordle.js'

// Middleware
const app = express();
app.use(morgan('dev'));
app.use(cors())
app.use(express.json({limit: '50mb'}))

app.get('/topAnswers', (req, res) => res.send(Wordle.getTopAnswers()))

app.get('/possibleAnswers', (req, res) => res.send(Wordle.getPossibleAnswers()))

app.get('/restart', (req, res) => {
    Wordle.restart()
    return res.status(200).json({success: true})
})

app.post('/validate', (req, res, next) => {
    return res.status(200).json({result: Wordle.validateGuess(req.body.guess, req.body.pattern)})
})

app.listen(5000, () => {
    console.log(`Server is listening at http://localhost:5000`);
});
