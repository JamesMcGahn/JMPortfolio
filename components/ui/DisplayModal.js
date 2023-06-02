import Modal from 'react-bootstrap/Modal';

function DisplayModal({ show, setShow, children, title }) {
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default DisplayModal;
