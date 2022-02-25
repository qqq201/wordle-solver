import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const Header = ({mode, changeMode}) => {
    return (
        <header className="App-header">
            <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle id="dropdown-option" variant="info" className="btn-lg">WORDLE</Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item active={mode === "2309"} onClick={() => changeMode("2309")}>2309 words with uniform distribution</Dropdown.Item>
                <Dropdown.Item active={mode === "12947"} onClick={() => changeMode("12947")}>12947 words with refined relative frequency</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </header>
    )
}

export default Header
