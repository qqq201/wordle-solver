import Modal from 'react-bootstrap/Modal'

const ServerError = ({error, setClose}) => {
    return (
        <Modal show={error} onHide={setClose}>
            <Modal.Header>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>Can not connect to server</Modal.Body>
        </Modal>
    )
}

export default ServerError
