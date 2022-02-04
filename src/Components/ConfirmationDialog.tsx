import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

function ConfirmationDialog ({ show, message, callback, close } : InferProps<typeof ConfirmationDialog.propTypes>) {
  return (
    <React.Fragment>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button variant="primary" onClick={callback}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

ConfirmationDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
}

export default ConfirmationDialog;