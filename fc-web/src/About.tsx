import React from "react";
import logo from "./Images/MithrilAlmanacLogo.jpg";

const About = () => {
  return (
    <div className="landing">
    <div className="landing-content">
      <div className="intro-text">
        <h2>About the Mithril Almanac</h2>
        <p>Hey, my name is Zachary Shuford, and I created this site! <span role="img" aria-label="grin">😀</span></p>
        <p>If you find any bugs or have any issues, you can either file them on&nbsp;
          <a href="https://github.com/Pharylon/MithrilAlmanac/issues">the project's Github page</a> or 
          you can email them to me at me@zachshuford.com</p>
        <p>
          As of right now, I'm not charging for anything, and I promise that if I ever add a "paid tier" in the future, 
          it'll only be for new features. What's here as of right now will remain free as long as I operate the site.
        </p>
        <p>If you want to help me keep the lights on, you can head over to my&nbsp;
          <a href="https://www.patreon.com/mithrilalmanac">Patreon Page!</a></p>
        <p>Mithril Almanac is (c) 2020 Zachary Shuford </p>
      </div>
    </div>
  </div>
  );
};

export default About;
