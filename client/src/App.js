import './App.css';
import {useState, useEffect} from 'react'
import WordList from './components/WordList/WordList'
import Board from './components/Board/Board'
import RankingPanel from './components/RankingPanel/RankingPanel'
import MissingAlert from './components/Alerts/MissingAlert'
import InvalidAlert from './components/Alerts/InvalidAlert'
import WrongAlert from './components/Alerts/WrongAlert'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import wordle from './api/wordle'
import $ from 'jquery'

const nextColor = {
    "B": "Y",
    "Y": "G",
    "G": "B"
}

// console.clear();

function App() {
    const [guesses, setGuesses] = useState([])
    const [currentGuess, setCurrentGuess] = useState("")
    const [currentPattern, setCurrentPattern] = useState("BBBBB")
    const [top_answers, setTopAnswers] = useState([])
    const [possible_answers, setPossibleAnswers] = useState([])
    const [mode, setMode] = useState("2309")

    const fetchPossibleAnswers = async () => {
        try {
            const response = await wordle.getPossibleAnswers()
            setPossibleAnswers(response)
        } catch (error){
            console.log(error)
        }
    }

    const fetchTopAnswers = async () => {
        try {
            const response = await wordle.getTopAnswers()
            setTopAnswers(response)
        } catch (error){
            console.log(error)
        }
    }

    const addGuess = async () => {
        try {
            const check = await wordle.validate(currentGuess, currentPattern)

            if (check.result === 2){
                guesses.push([currentGuess, currentPattern])
                setGuesses(guesses)
                setCurrentGuess("")
                setCurrentPattern("BBBBB")
                setPossibleAnswers([])
                setTopAnswers([])
                fetchPossibleAnswers()
                fetchTopAnswers()
            }
            else {
                if (check.result === 1)
                    $('#invalid-alert').show()
                else if (check.result === 0)
                    $('#wrong-alert').show()
                else
                    $('#missing-alert').show()

                setTimeout(() => $('.alert').hide(), 2000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const start = async () => {
        try {
            const success = await wordle.restart()
            if (success){
                fetchPossibleAnswers()
                fetchTopAnswers()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const restart = async () => {
        setGuesses([])
        setCurrentGuess("")
        setCurrentPattern("BBBBB")
        setPossibleAnswers([])
        setTopAnswers([])
        start()
    }

    const changeColor = (id) => {
        setCurrentPattern(currentPattern.substring(0, id) + nextColor[currentPattern[id]] + currentPattern.substring(id + 1))
    }

    useEffect(() => {
        $('.alert').hide()
        start()
    }, [])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.keyCode > 64 && e.keyCode < 91 && currentGuess.length < 5){
                setCurrentGuess(currentGuess + e.key)
            }
            else if (e.keyCode === 8){
                setCurrentGuess(currentGuess.slice(0, -1))
            }
            else if (e.keyCode === 13){
                addGuess()
            }
        }
        window.addEventListener('keyup', handler)
        return () => {
            window.removeEventListener('keyup', handler)
        }
    }, [currentGuess, guesses, currentPattern])

    const changeMode = async (selected_mode) => {
        if (selected_mode !== mode){
            try {
                const res = await wordle.changeMode(selected_mode)
                if (res.success){
                    setMode(selected_mode)
                    restart()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="App">
            <MissingAlert/>
            <WrongAlert/>
            <InvalidAlert/>
            <header className="App-header">
              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle id="dropdown-option" variant="info" className="btn-lg">WORDLE</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item active={mode === "2309"} onClick={() => changeMode("2309")}>2309 words with same probability</Dropdown.Item>
                  <Dropdown.Item active={mode === "12947"} onClick={() => changeMode("12947")}>12947 words with diffrent probability</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </header>
            <div className="container-fluid">
                <div className='row justify-content-around'>
                    <WordList possible_answers={possible_answers}/>
                    <Board guesses={guesses} currentGuess={currentGuess} currentPattern={currentPattern} changeColor={changeColor}/>
                    <RankingPanel top_answers={top_answers}/>
                </div>
                <button type="button" className="btn restart" onClick={restart}>Restart</button>
                <button type="button" className="btn add" onClick={addGuess}>Add</button>
            </div>
        </div>
    );
}

export default App;
