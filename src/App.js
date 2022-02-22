import './App.css';
import {useState, useEffect} from 'react'
import WordList from './components/WordList/WordList'
import Board from './components/Board/Board'
import RankingPanel from './components/RankingPanel/RankingPanel'
import MissingAlert from './components/Alerts/MissingAlert'
import InvalidAlert from './components/Alerts/InvalidAlert'
import WrongAlert from './components/Alerts/WrongAlert'
import Wordle from './wordle.js'
import $ from 'jquery'

const nextState = {
    "B": "Y",
    "Y": "G",
    "G": "B"
}

// console.clear();

function App() {
    const [guesses, setGuesses] = useState([])
    const [currentGuess, setCurrentGuess] = useState("")
    const [currentState, setCurrentState] = useState("BBBBB")
    const [top_answers, setTopAnswers] = useState([])
    const [possible_words, setPossibleWords] = useState(Wordle.getPossibleWords())

    const fetchTopAnswers = () => {
        setTimeout(() => {
            if (top_answers.length === 0){
                setTopAnswers(Wordle.getTopAnswers())
                fetchTopAnswers()
            }
        }, 1000)
    }

    fetchTopAnswers()

    useEffect(() => {
        $('.alert').hide()

        const handler = (e: KeyboardEvent) => {
            if (e.keyCode > 64 && e.keyCode < 91 && currentGuess.length < 5){
                setCurrentGuess(currentGuess + e.key)
            }
            else if (e.keyCode === 8){
                setCurrentGuess(currentGuess.slice(0, -1))
            }
            else if (e.keyCode === 13){
                const check = Wordle.validateGuess(currentGuess, currentState)
                if (check === 2){
                    guesses.push([currentGuess, currentState])
                    setGuesses(guesses)
                    setCurrentGuess("")
                    setCurrentState("BBBBB")
                    setPossibleWords(Wordle.getPossibleWords())
                    setTopAnswers(Wordle.getTopAnswers())
                }
                else if (check === 1)
                    $('#invalid-alert').show()
                else if (check === 0)
                    $('#wrong-alert').show()
                else
                    $('#missing-alert').show()
            }
        }
        window.addEventListener('keyup', handler)
        return () => {
            window.removeEventListener('keyup', handler)
        }
    }, [currentGuess, guesses, currentState])

    const addGuess = () => {
        const check = Wordle.validateGuess(currentGuess, currentState)
        if (check === 2){
            guesses.push([currentGuess, currentState])
            setGuesses(guesses)
            setCurrentGuess("")
            setCurrentState("BBBBB")
            setPossibleWords(Wordle.getPossibleWords())
            setTopAnswers(Wordle.getTopAnswers())
        }
        else if (check === 1)
            $('#invalid-alert').show()
        else if (check === 0)
            $('#wrong-alert').show()
        else
            $('#missing-alert').show()
    }

    const restart = () => {
        setGuesses([])
        setCurrentGuess("")
        setCurrentState("BBBBB")
        Wordle.restart()
        setTopAnswers(Wordle.getTopAnswers())
        setPossibleWords(Wordle.getPossibleWords())
    }

    const changeState = (id) => {
        setCurrentState(currentState.substring(0, id) + nextState[currentState[id]] + currentState.substring(id + 1))
    }

    return (
        <div className="App">

            <MissingAlert/>
            <WrongAlert/>
            <InvalidAlert/>

            <div className="container-fluid">
                <header className="App-header">WORDLE</header>

                <div className='row justify-content-around'>
                    <WordList possible_words={possible_words}/>
                    <Board guesses={guesses} currentGuess={currentGuess} currentState={currentState} changeState={changeState}/>
                    <RankingPanel top_answers={top_answers}/>
                </div>
                <button type="button" className="btn restart" onClick={restart}>Restart</button>
                <button type="button" className="btn add" onClick={addGuess}>Add</button>
            </div>
        </div>
    );
}

export default App;
