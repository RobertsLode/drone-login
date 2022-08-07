/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import './Login.scss';
// ustaisit lai pogas nekustina formu
// signup/login parbaude
type LoginProps = {
    newUsername: string | undefined;
    newPassword: string | undefined;
    newEmail: string | undefined;
    loginUsername: string | undefined;
    loiginPassword: string | undefined;
    onUsernameChange: (value:string) => void;
    onPasswordChange: (value:string) => void;
    onEmailChange: (value:string) => void;
    handeleNewUser: () => void;
    handleLoginUsername: (value:string) => void;
    handleLoginPassword: (value:string) => void;
    handleLogin: () => void;

};

const Login = ({
  newPassword,
  newUsername,
  newEmail,
  loginUsername,
  loiginPassword,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  handeleNewUser,
  handleLoginPassword,
  handleLoginUsername,
  handleLogin,
}: LoginProps) => {
  const [loginOrSignin, setLoginOrSignin] = useState<string>('Login');

  return (
    <div className="login--main ">

      <div className="form--button-box">
        <button
          className="form--button"
          onClick={() => {
            setLoginOrSignin('Login');
          }}
        >
          Login
        </button>
        <button
          className="form--button"
          onClick={() => {
            setLoginOrSignin('Sign up');
          }}
        >
          Sign up
        </button>
      </div>
      {loginOrSignin === 'Login'
        ? (
          <div>
            <p className="text">Please log in!</p>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label"
              >
                User name
              </label>
              <input
                required
                value={loginUsername}
                onChange={(e) => {
                  handleLoginUsername(e.target.value);
                }}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label"
              >
                Password
              </label>
              <input
                required
                value={loiginPassword}
                onChange={(e) => {
                  handleLoginPassword(e.target.value);
                }}
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Example password"
              />
            </div>
            <button
              className="form--button"
              onClick={handleLogin}
            >
              Log in
            </button>
          </div>
        )
        : (
      // ________________________________ sign up ________________________________
          <div>
            <p className="text">Please sign up!</p>
            <div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  User name
                </label>
                <input
                  required
                  value={newUsername}
                  onChange={(e) => {
                    onUsernameChange(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email
                </label>
                <input
                  required
                  value={newEmail}
                  onChange={(e) => {
                    onEmailChange(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Password
                </label>
                <input
                  required
                  value={newPassword}
                  onChange={(e) => {
                    onPasswordChange(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Example password"
                />
              </div>
            </div>
            <button
              className="form--button"
              onClick={() => {
                handeleNewUser();
                setLoginOrSignin('Login');
              }}

            >
              Sign up!
            </button>
          </div>
        )}

      {(newEmail || newPassword || newUsername) && (
        <p>Complete all fields!</p>
      )}
    </div>
  );
};

export default Login;
