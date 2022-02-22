import EmptyRow from './EmptyRow.js'
import CurrentRow from './CurrentRow.js'
import CompleteRow from './CompleteRow.js'

const Board = ({guesses, currentGuess, currentPattern, changeColor}) => {
    const empties = guesses.length < 6 ? [...Array(5 - guesses.length)] : []

    return (
        <div className='col-md-3' id='board'>
            {guesses.map((guess, i) =>
                <CompleteRow key={i} word={guess[0]} pattern={guess[1]}/>
            )}
            {guesses.length < 6 &&
                <CurrentRow guess={currentGuess} pattern={currentPattern} changeColor={changeColor}/>
            }
            {empties.map((_, i) =>
                <EmptyRow key={i} />
            )}
        </div>
    )
}

export default Board
