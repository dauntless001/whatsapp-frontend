import './Home.css'
import Layout from "./partials/Layout";
import {useState} from 'react'
import Popup from "reactjs-popup";
import BASE_URL from '../utils'

const Home = ({isLoggedIn}) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = e => {
        e.preventDefault();
        console.log(phoneNumber)
        const url = `${BASE_URL}api/login/`
        fetch(url, {
          method : 'POST',
          headers : {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify({
            phoneNumber: phoneNumber,
          })
        })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', data.user_id)
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  return (
    <>
      {isLoggedIn ? (
        <Layout>
          <div className="home__container">
            <div className="home__intro">
              <h3>Welcome to Olofofo</h3>
              <p>This is still in Beta stage, there are loads of cool functionalities comming through 😉</p>
            </div>
          </div>
        </Layout>
      ) : (
        <div className="auth__container">
          <div
            style={{
              position: "absolute",
              top: "50%",
              textAlign: "center",
              width: "100%",
            }}
          >
            <Popup trigger={<button className="auth__login_btn">Login</button>} modal>
              {(close) => (
                <div className="modal">
                  {/* <button className="close" onClick={close}>
                    &times;
                  </button> */}
                  <h2 className="header" style={{ textAlign: "center" }}>
                    {" "}
                    Login{" "}
                  </h2>
                  <div className="content">
                    <form onSubmit={handleLogin}>
                      <div className="auth__form__container">
                        <label>Phone Number</label>
                        <input
                          placeholder="Phone Number"
                          type="number"
                          value={phoneNumber}
                          className = "auth__form__input"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                      <button className="auth__login_btn">Login</button>
                    </form>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
