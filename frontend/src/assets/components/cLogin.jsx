import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Optionally import Header if it's defined elsewhere
// import Header from './Header';

function Header() {
  return (
    <header>
      <h1>Welcome to the Login Page</h1>
    </header>
  );
}

function CLogin() {
  const [cusID, setCusID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      cusID,
      password,
    };

    if (cusID === 'customer' && password === 'customer123') {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome back!",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/applicant');
      return; 
    }
    // (Continue with other conditions...)

    try {
      const response = await axios.post("http://localhost:8076/customer/cLogin", credentials);
      const userData = response.data;

      if (userData) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Welcome back, ${userData.firstName}!`,
          showConfirmButton: false,
          timer: 2000,
        });

        navigate(`/ReadOneHome/${cusID}`);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Invalid credentials",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Login failed:", error.response.data.message || error.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login failed",
        text: error.response.data.message || error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="HN">
      <div className="login-root" style={{ marginTop: "150px" }}>
        <Header />
        <div className="login-root">
          <div className="box-root flex-flex flex-direction--column" style={{ minHeight: "100vh", flexGrow: 1 }}>
            <div className="loginbackground box-background--white padding-top--64">
              {/* (Your background code...) */}
            </div>
            <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
              <div className="formbg-outer">
                <div className="formbg">
                  <div className="formbg-inner padding-horizontal--48">
                    <span className="padding-bottom--15" style={{ fontWeight: "bold", textAlign: "center" }}>Log in to your account</span>
                    <form id="stripe-login" onSubmit={onLogin}>
                      <div className="field padding-bottom--24">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" onChange={(e) => setCusID(e.target.value)} />
                      </div>
                      <div className="field padding-bottom--24">
                        <div className="grid--50-50">
                          <label htmlFor="password">Password</label>
                          <div className="reset-pass">
                            <a href="#">Forgot your password?</a>
                          </div>
                        </div>
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <div className="field padding-bottom--24">
                        <input type="submit" name="submit" value="Log In" />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="footer-link padding-top--24">
                  <span>Don't have an account? <a href="/customer/create" className="signup-link" style={{color:"black"}}>Sign up</a></span>
                  <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                    <span><a href="#">© Stackfindover</a></span>
                    <span><a href="#">Contact</a></span>
                    <span><a href="#">Privacy & terms</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CLogin;
