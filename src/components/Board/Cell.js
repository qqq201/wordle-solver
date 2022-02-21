const Cell = ({char, state, changeState}) => {
    const map = {
        "B": "absent",
        "Y": "present",
        "G": "correct"
    }

    return (
        <div className={"col cell " + map[state]} onClick={changeState}>
            {char}
        </div>
    )
}

export default Cell
