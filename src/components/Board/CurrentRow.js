import Cell from './Cell.js'

const CurrentRow = ({guess}) => {
    const row = [...Array(5)]

    return (
        <div className='row'>
            {row.map((_, i) => (
                <Cell char={guess[i]} key={i}/>
            ))}
        </div>
    )
}

export default CurrentRow
