import React, { useState, useEffect } from "react";
import ReleaseNotes, { Release } from "./ReleaseNotes";

const UpdateBanner = () => {
  const [updateInfo, setUpdateInfo] = useState<Release>({ version: 0, items: [] });

  const currentVersion = ReleaseNotes.map(x => x.version).reduce((p, c) => (c > p ? c : p));

  function closeBanner(){
    localStorage.setItem("lastVersion", currentVersion.toString());
    setUpdateInfo({version: 0, items: []});
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
      if (currentVersion <= lastSeen) {
        return {
          version: 0,
          items: [],
        };
      }
      const items = ReleaseNotes
        .filter(x => x.version > lastSeen)
        .map(x => x.items)
        .reduce((prev, curr) => ([...prev, ...curr]));
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

  if ( updateInfo.version === 0) {
    return <React.Fragment></React.Fragment>;
  }
  return (
    <div className="new-banner">
      <div>{`Welcome to version ${updateInfo.version} 
        of the Mithril Almanac! New features in this release include:`}</div>
      <ul>
        {
          updateInfo.items.map(x => (<li key={x}>{x}</li>))
        }
      </ul>
      <button
        onClick={() => closeBanner()}
        style={{ fontSize: "1.5em" }}
        className="blue-button">Got it, thanks!</button>
    </div>
  );
};

export default UpdateBanner;
