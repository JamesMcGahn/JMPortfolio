import Modal from 'react-bootstrap/Modal';

function DisplayModal({ show, setShow, children }) {
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default DisplayModal;
