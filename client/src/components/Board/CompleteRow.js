import Cell from './Cell.js'

const CompleteRow = ({word, pattern}) => {
    return (
        <div className='row'>
            {word.split('').map((char, i) => (
                <Cell key={i} char={char} color={pattern[i]}/>
            ))}
        </div>
    )
}

export default CompleteRow
