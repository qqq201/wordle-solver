import './App.css';
import {useState, useEffect} from 'react'
import Board from './components/Board/Board.js'
import {evaluateGuess, generateWord} from './wordle.js'
import $ from 'jquery'

function App() {
    const [guesses, setGuesses] = useState([])
    const [currentGuess, setCurrentGuess] = useState("")

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
                if (currentGuess.length === 5){
                    const check = evaluateGuess(currentGuess)
                    if (check === 1){
                        guesses.push(currentGuess)
                        setGuesses(guesses)
                        setCurrentGuess("")
                    }
                    else if (check === 0){
                        $('#wrong-alert').show()
                    }
                }
                else {
                    $('#missing-alert').show()
                }
            }
        }
        window.addEventListener('keyup', handler)
        return () => {
            window.removeEventListener('keyup', handler)
        }
    }, [currentGuess, guesses])

    const restart = () => {
        setGuesses([])
        setCurrentGuess("")
        generateWord()
    }

    return (
        <div className="App">
            <div className="alert alert-info" id="wrong-alert" role="alert">
                Not in word list
            </div>

            <div className="alert alert-info" id="missing-alert" role="alert">
                Too short
            </div>

            <header className="App-header">WORDLE</header>

            <Board guesses={guesses} currentGuess={currentGuess}/>
            <button type="button" className="btn btn-info" onClick={restart}>Restart</button>
        </div>
    );
}

export default App;
