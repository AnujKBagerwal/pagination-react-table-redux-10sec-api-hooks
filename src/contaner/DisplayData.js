import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DisplayData = ({ modal, selectedData, modalClose }) => {
  return (
    <>
      <Modal show={modal} onHide={() => modalClose()} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{selectedData.title && selectedData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <pre>{JSON.stringify(selectedData, null, 2)}</pre>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => modalClose()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DisplayData;
