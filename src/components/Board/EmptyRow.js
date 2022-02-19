import Cell from './Cell.js'

const EmptyRow = () => {
    const row = [...Array(5)]
    return (
        <div className='row'>
            {row.map((e, i) => (
                <Cell key={i}/>
            ))}
        </div>
    )
}

export default EmptyRow
