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
          <label>
            <h3>Username</h3>
            <InputText
              value={props.username}
              onChange={props.onUsernameChange}
              id="username"
              className={`p-mb-2 ${props.isEmptyUsername ? 'p-invalid' : ''}`}
            />
            {props.isEmptyUsername ? (
              <small id="username-help" className="p-error p-d-block">
                Please enter a username
              </small>
            ) : null}
            {!props.validLogin ? (
              <small id="username-help" className="p-error p-d-block">
                Incorrect username or password
              </small>
            ) : null}
          </label>
          <label>
            <h3>Password</h3>
            <Password
              value={props.password}
              onChange={props.onPasswordChange}
              id="password"
              className={`p-mb-2 ${props.isEmptyPassword ? 'p-invalid' : ''}`}
            />
            {props.isEmptyPassword ? (
              <small id="password-help" className="p-error p-d-block">
                Please enter a password
              </small>
            ) : null}
            {!props.validLogin ? (
              <small id="username-help" className="p-error p-d-block">
                Incorrect username or password
              </small>
            ) : null}
          </label>

          <div>
            <span className="p-mr-6">
              <ButtonSubmit label="Login" />
            </span>
            <Button
              type="button"
              onClick={props.onClickRegister}
              className="p-my-5 p-button-secondary p-button-rounded"
              label="Go to Register"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
