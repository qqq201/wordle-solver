import Cell from './Cell.js'

const CurrentRow = ({guess, pattern, changeColor}) => {
    return (
        <div className='row'>
            {[...Array(5)].map((_, i) => (
                <Cell key={i} char={guess[i]} color={pattern[i]} changeColor={() => changeColor(i)}/>
            ))}
        </div>
    )
}

export default CurrentRow
