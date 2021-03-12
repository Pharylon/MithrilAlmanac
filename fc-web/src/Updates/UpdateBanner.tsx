import React, { useState, useEffect } from "react";
import ReleaseNotes, { Release } from "./ReleaseNotes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const UpdateBanner = () => {
  const [updateInfo, setUpdateInfo] = useState<Release>({ version: "", items: [] });

  const currentVersion = ReleaseNotes.map(x => x.version).reduce((p, c) => (c > p ? c : p));

  function closeBanner(){
    localStorage.setItem("lastVersion", currentVersion.toString());
    setUpdateInfo({version: "", items: []});
  }

  useEffect(() => {
    function getLastVersionSeen() {
      const vString = localStorage.getItem("lastVersion");
      if (vString) {
        return parseFloat(vString);
      }
      return 0;
    }

    function getUpdateInfo(): Release {
      const lastSeen = getLastVersionSeen();
      if (!lastSeen) {
        return ReleaseNotes[ReleaseNotes.length - 1];
      }
      const currentVersionParsed = parseInt(currentVersion, 10);
      if (currentVersionParsed <= lastSeen) {
        return {
          version: "",
          items: [],
        };
      }
      const items = ReleaseNotes
        .filter(x => parseInt(x.version, 10) > lastSeen)
        .map(x => x.items)
        .reduce((prev, curr) => ([...prev, ...curr]));
      if (items.length > 10){
        items.splice(10);
      }
      return {
        version: currentVersion,
        items,
      };
    }
    const myUpdateInfo = getUpdateInfo();
    if (myUpdateInfo.version) {
      setUpdateInfo(myUpdateInfo);
    }
  }, [currentVersion]);

  if (!updateInfo.version) {
    return <React.Fragment></React.Fragment>;
  }
  return (
    <div className="new-banner">
      <div>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div>{`Welcome to version ${updateInfo.version} 
          of the Mithril Almanac! New features in this release include:`}</div>
          <div onClick={() => closeBanner()} style={{marginLeft: "auto", cursor: "pointer"}}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <ul>
          {
            updateInfo.items.map(x => (<li key={x}>{x}</li>))
          }
        </ul>
        <div>If you've spotted a bug or would like to request a feature, please do so on&nbsp;
          <a className="link" href="https://github.com/Pharylon/MithrilAlmanac/issues">our Github page!</a>
          
        </div>
        <button
          onClick={() => closeBanner()}
          style={{ fontSize: "1.5em" }}
          className="blue-button">Got it, thanks!</button>
      </div>
    </div>
  );
};

export default UpdateBanner;
