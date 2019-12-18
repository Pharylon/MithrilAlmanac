import React, { useEffect } from "react";
import "./App.css";
import { observer } from "mobx-react";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from "react-google-login";
import { AuthenticateUser } from "./DataClients/CalendarEventDataClient";
import UserState from "./State/UserState";
import GoogleLogo from "./Images/GoogleG.png";

const GoogleButton: React.FC = observer(() => {
  
  function onLogOut(){
    console.log("Logged Out");
  }
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log("Google Response", response);
    const loginResponse = response as GoogleLoginResponse;
    //Make sure the cast is correct
    if (loginResponse.tokenId) {
      const idToken = loginResponse.getAuthResponse().id_token;
      console.log("LoginResponse", loginResponse);
      AuthenticateUser(idToken);
      UserState.loginModalOpen = false;
    }
  };
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
  return (
    <div>
      {/* <GoogleLogout
      clientId={clientId}
      buttonText="Logout"
      onLogoutSuccess={() => console.log("Success")}
      onFailure={() => console.log("fail")}
    >
    </GoogleLogout> */}
      <GoogleLogin
          clientId={clientId}
          render={(props) => (
            <button className="google-login-button" onClick={props.onClick}>
              <div className="g-wrap"><img src={GoogleLogo}/></div>
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
