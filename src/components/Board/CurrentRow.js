import Cell from './Cell.js'

const CurrentRow = ({guess, state, changeState}) => {
    return (
        <div className='row'>
            {[...Array(5)].map((_, i) => (
                <Cell key={i} char={guess[i]} state={state[i]} changeState={() => changeState(i)}/>
            ))}
        </div>
    )
}

export default CurrentRow
