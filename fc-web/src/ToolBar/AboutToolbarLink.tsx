import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <div className="tool-child">
      <Link className="toolbar-link" to="/about">
        <div >
          <FontAwesomeIcon icon={faQuestionCircle} />
        </div>
      </Link>
    </div>
  );
};

export default About;
