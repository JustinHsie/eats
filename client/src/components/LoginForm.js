import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { ButtonSubmit } from './ButtonSubmit';
import { Button } from 'primereact/button';

export function LoginForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="p-m-6 p-d-flex p-jc-center">
        <div className="card">
          <h2>Login</h2>

          {/* Username input form */}
          <label>
            <h3>Username</h3>
            <InputText
              value={props.username}
              onChange={props.onUsernameChange}
              id="username"
              className={`p-mb-2 ${props.isEmptyUsername ? 'p-invalid' : ''}
              ${!props.validLogin ? 'p-invalid' : ''}`}
            />

            {/* Display error text if empty username */}
            {props.isEmptyUsername ? (
              <small id="username-help" className="p-error p-d-block">
                Please enter a username
              </small>
            ) : null}

            {/* Display error text if incorrect username */}
            {!props.validLogin ? (
              <small id="username-help" className="p-error p-d-block">
                Incorrect username or password
              </small>
            ) : null}
          </label>

          {/* Password input form */}
          <label>
            <h3>Password</h3>
            <Password
              value={props.password}
              onChange={props.onPasswordChange}
              id="password"
              className={`p-mb-2 ${props.isEmptyPassword ? 'p-invalid' : ''} 
              ${!props.validLogin ? 'p-invalid' : ''}`}
            />

            {/* Display error text if empty password */}
            {props.isEmptyPassword ? (
              <small id="password-help" className="p-error p-d-block">
                Please enter a password
              </small>
            ) : null}

            {/* Display error text if incorrect password */}
            {!props.validLogin ? (
              <small id="username-help" className="p-error p-d-block">
                Incorrect username or password
              </small>
            ) : null}
          </label>

          <div>
            {/* Submit form button */}
            <div className="p-text-right">
              <ButtonSubmit label="Login" />
            </div>

            {/* Register button */}
            <Button
              label="New User? Register Here"
              className="p-button-outlined p-button-secondary"
              type="button"
              onClick={props.onClickRegister}
            />
          </div>
          <div className="p-mt-5">
            <p>Demo:</p>
            <p>Username: Justin</p>
            <p>Password: Hsie</p>
          </div>
        </div>
      </div>
    </form>
  );
}
