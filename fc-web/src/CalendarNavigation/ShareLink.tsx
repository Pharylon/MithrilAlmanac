import React, { useState } from "react";

const ShareLink = (props: { id: string, link: string, isEdit: boolean }) => {
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  function copyToClipBoard() {
    const shareLink = document.getElementById(props.id) as HTMLInputElement;
    console.log("ShareLink", shareLink);
    shareLink.focus();
    shareLink.select();
    shareLink.setSelectionRange(0, 99999);
    const success = document.execCommand("copy");
    if (success) {
      setCopyButtonText("Copied!");
    }
  }
  return (
    <div className="share-combo">
      {
        props.isEdit ?
          (
            <div className="share-text">
              Collaboration Link <span style={{ fontSize: 16 }}>(anyone with this link can EDIT your calendar)</span>
            </div>
          ) :
          (
            <div className="share-text">
              View Link <span style={{ fontSize: 16 }}>(anyone with this link can view your calendar)</span>
            </div>
          )
      }
      <div className="share-button-input">
        <button onClick={() => copyToClipBoard()}>{copyButtonText}</button>
        <input type="text" readOnly={true} id={props.id} value={props.link} />
      </div>
    </div>
  );
};

export default ShareLink;
