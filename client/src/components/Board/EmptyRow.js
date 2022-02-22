import Cell from './Cell.js'

const EmptyRow = () => {
    return (
        <div className='row'>
            {[...Array(5)].map((_, i) => (
                <Cell key={i}/>
            ))}
        </div>
    )
}

export default EmptyRow
