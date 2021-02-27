import React from 'react';
import { Password } from 'primereact/password';
import { ButtonSubmit } from './ButtonSubmit';
import { ButtonCancel } from './ButtonCancel';

export function PasswordForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="p-d-flex p-jc-center">
        <div className="card">
          <h3>Change Password</h3>
          <label>
            <h4>Old Password</h4>
            <Password
              value={props.oldPass}
              onChange={props.onOldPassChange}
              id="password-old"
              className={`p-mb-2 ${props.isEmptyOldPass ? 'p-invalid' : ''}
              ${!props.validOldPass ? 'p-invalid' : ''}`}
            />
            {props.isEmptyOldPass ? (
              <small id="username-help" className="p-error p-d-block">
                Please enter old password
              </small>
            ) : null}
            {!props.validOldPass ? (
              <small id="username-help" className="p-error p-d-block">
                Incorrect password
              </small>
            ) : null}
          </label>
          <label>
            <h4>New Password</h4>
            <Password
              value={props.newPass}
              onChange={props.onNewPassChange}
              id="password-new"
              className={`p-mb-2 ${props.isEmptyNewPass ? 'p-invalid' : ''} 
              ${!props.isSamePass ? 'p-invalid' : ''}`}
            />
            {props.isEmptyNewPass ? (
              <small id="password-help" className="p-error p-d-block">
                Please enter a new password
              </small>
            ) : null}
          </label>
          <label>
            <h4>Confirm New Password</h4>
            <Password
              value={props.newPassRpt}
              onChange={props.onNewPassRptChange}
              id="passwordRpt-new"
              className={`p-mb-2 ${!props.isSamePass ? 'p-invalid' : ''}`}
            />
            {!props.isSamePass ? (
              <small id="password-help" className="p-error p-d-block">
                Passwords must match
              </small>
            ) : null}
          </label>

          <div>
            <span className="p-mr-6">
              <ButtonCancel
                type="button"
                onClick={props.onCancelClick}
                className="p-my-5 p-button-help p-button-rounded"
                label="Cancel"
              />
            </span>
            <ButtonSubmit label="Submit" />
          </div>
        </div>
      </div>
    </form>
  );
}
