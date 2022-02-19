import Cell from './Cell.js'
import {getStatus} from '../../wordle.js'

const CompleteRow = ({word}) => {
    const results = getStatus(word)

    return (
        <div className='row'>
            {word.split('').map((char, i) => (
                <Cell char={char} status={results[i]} key={i}/>
            ))}
        </div>
    )
}

export default CompleteRow
