import Modal from 'react-bootstrap/Modal';

interface Props {
  show: boolean;
  children: React.ReactNode;
  title: string;
  setShow: (n: boolean) => void;
}

function DisplayModal({ show, setShow, children, title }: Props) {
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
