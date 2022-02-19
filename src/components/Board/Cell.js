const Cell = ({char, status}) => {
    return (
        <div className={"col cell " + status}>
            {char}
        </div>
    )
}

export default Cell
