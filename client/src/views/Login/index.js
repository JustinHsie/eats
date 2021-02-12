import React from 'react';
import { LoginForm } from '../../components/LoginForm';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isEmptyUsername: false,
      isEmptyPassword: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    // Check if empty username or password
    if (this.state.username === '') {
      this.setState({ isEmptyUsername: true });
    } else if (this.state.password === '') {
      this.setState({ isEmptyPassword: true });
    } else {
      console.log('nice');
    }
  };

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });

    // Warn user if empty username
    if (e.target.value === '') {
      this.setState({ isEmptyUsername: true });
    } else {
      this.setState({ isEmptyUsername: false });
    }
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });

    // Warn user if empty password
    if (e.target.value === '') {
      this.setState({ isEmptyPassword: true });
    } else {
      this.setState({ isEmptyPassword: false });
    }
  };

  render() {
    return (
      <LoginForm
        onSubmit={this.handleSubmit}
        username={this.state.username}
        onUsernameChange={this.handleUsernameChange}
        isEmptyUsername={this.state.isEmptyUsername}
        password={this.state.password}
        onPasswordChange={this.handlePasswordChange}
        isEmptyPassword={this.state.isEmptyPassword}
      />
    );
  }
}
