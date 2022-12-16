import "./Modal.css";

function Modal({ children, modalOn, setModalOn }) {
  return modalOn ? (
    <div className="Modal">
      <div className="ModalContent">
        <img
          className="CloseModalButton"
          onClick={() => {
            setModalOn(false);
          }}
          src={"https://api.iconify.design/ep:close-bold.svg?color=%23888888"}
          alt="X"
        />
        {children}
      </div>
    </div>
  ) : (
    <div />
  );
}

export default Modal;
