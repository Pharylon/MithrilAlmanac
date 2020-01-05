import React, { useState } from "react";
import { observer } from "mobx-react";
import GoogleLogo from "../Images/GoogleG.png";
import BounceLoader from "react-spinners/BounceLoader";
import "./SignIn.css";
import { GetConsentPage } from "../DataClients/AuthenticationDataClient";

const GoogleButton: React.FC = observer(() => {
  const [loading, setLoading] = useState(false);
  async function goToGoogleLogin() {
    setLoading(true);
    const url = await GetConsentPage();
    if (url && url.length){
      window.location.assign(url);
    }    
    else{
      setLoading(false);
      console.log("Something went wrong getting the consent page");
    }
  }
  return (
    <div>
      <button className="google-login-button" onClick={() => goToGoogleLogin()}>
        {
          loading ?
            (
              <div className="p-loader-wrap">
                <div><BounceLoader size={40} /></div>
                <div>Fetching your Login Info...</div>
              </div>
            ) :
            (
              <div>
                <div className="g-wrap">
                  <img src={GoogleLogo} alt="Google Logo" />
                </div>
                <div>Sign in With Google</div>
              </div>
            )
        }


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
