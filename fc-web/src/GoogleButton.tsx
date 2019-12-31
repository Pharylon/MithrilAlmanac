import React from "react";
import "./App.css";
import { observer } from "mobx-react";
import GoogleLogo from "./Images/GoogleG.png";
import { GetConsentPage } from "./DataClients/AuthenticationDataClient";

const GoogleButton: React.FC = observer(() => {
  async function goToGoogleLogin(){
    const url = await GetConsentPage();
    if (url && url.length){
      window.location.assign(url);
    }    
  }
  return (
    <div>
      <button className="google-login-button" onClick={() => goToGoogleLogin()}>
        <div className="g-wrap"><img src={GoogleLogo} alt="Google Logo"/></div>
        <div>Sign In With Google</div>
      </button>
      {/* <GoogleLogin
          clientId={clientId}
          render={(props) => (
            
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
    /> */}
    </div>
  );
});

export default GoogleButton;
