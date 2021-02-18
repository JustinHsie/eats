import React from 'react';
import { Button } from 'primereact/button';

export function User(props) {
  return (
    <div className="p-m-6 p-d-flex p-jc-center">
      <div className="card'">
        <h2 className="p-mb-4">User</h2>
        <h1 className="p-mb-6">{props.username}</h1>
        <h2>Options:</h2>
        <div>{props.showPasswordForm ? props.passwordForm : null}</div>
        <div>
          {!props.showPasswordForm ? (
            <Button
              type="button"
              onClick={props.onChangePasswordClick}
              className="p-mt-2 p-mb-2 p-button-info p-button-rounded"
              label="Change Password"
            />
          ) : null}
        </div>
        <Button
          type="button"
          onClick={props.onLogoutClick}
          className="p-my-4 p-button-secondary p-button-rounded"
          label="Logout"
        />
      </div>
    </div>
  );
}
