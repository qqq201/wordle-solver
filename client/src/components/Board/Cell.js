const Cell = ({char, color, changeColor}) => {
    const map = {
        "B": "absent",
        "Y": "present",
        "G": "correct"
    }

    return (
        <div className={"col cell " + map[color]} onClick={changeColor}>
            {char}
        </div>
    )
}

export default Cell
