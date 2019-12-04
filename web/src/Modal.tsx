import React from "react";
import { observer } from "mobx-react-lite";
import "./modal.css";

export interface IModal {
  title: string;
  visible: boolean;
  onTryClose: () => void;
  className?: string;
  children: any;
}

const Modal = observer((props: IModal) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target){
      props.onTryClose();
    }
  };
  const myClassName = [props.className || "", "modal-content"].join(" ");
  return (
    <div onClick={handleClick} className="modal" style={{display: props.visible ? "block" : "none" }}>
      <div className={myClassName}>
        <div className="modal-header">
          <span onClick={props.onTryClose} className="close">x</span>
          <div className="modal-title">{props.title}</div>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
      </div>
    </div>
  );
});

export default Modal;
