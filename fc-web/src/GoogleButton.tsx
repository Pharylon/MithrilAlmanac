import React from "react";
import "./App.css";
import { observer } from "mobx-react";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { AuthenticateUser } from "./DataClients/CalendarEventDataClient";
import UserState from "./State/UserState";
import GoogleLogo from "./Images/GoogleG.png";

const GoogleButton: React.FC = observer(() => {
  
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const loginResponse = response as GoogleLoginResponse;
    //Make sure the cast is correct
    if (loginResponse.tokenId) {
      const idToken = loginResponse.getAuthResponse().id_token;
      AuthenticateUser(idToken);
      UserState.loginModalOpen = false;
    }
  };
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
  return (
    <div>
      <GoogleLogin
          clientId={clientId}
          render={(props) => (
            <button className="google-login-button" onClick={props.onClick}>
              <div className="g-wrap"><img src={GoogleLogo} alt="Google Logo"/></div>
              <div>Sign In With Google</div>
            </button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
    />
    </div>
  );
});

export default GoogleButton;
