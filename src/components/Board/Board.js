import './Board.css'
import EmptyRow from './EmptyRow.js'
import CurrentRow from './CurrentRow.js'
import CompleteRow from './CompleteRow.js'

const Board = ({guesses, currentGuess}) => {
    const empties = guesses.length < 6 ? [...Array(5 - guesses.length)] : []

    return (
        <div className='container' id='board'>
            {guesses.map((word, i) => (
                <CompleteRow key={i} word={word}/>
            ))}
            {guesses.length < 6 && (
                <CurrentRow guess={currentGuess}/>
            )}
            {empties.map((_, i) => (
                <EmptyRow key={i} />
            ))}
        </div>
    )
}

export default Board
