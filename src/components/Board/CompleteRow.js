import Cell from './Cell.js'

const CompleteRow = ({word, state}) => {
    return (
        <div className='row'>
            {word.split('').map((char, i) => (
                <Cell key={i} char={char} state={state[i]}/>
            ))}
        </div>
    )
}

export default CompleteRow
