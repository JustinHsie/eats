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

    // Prevent submission if empty username or password
    if (this.state.username === '') {
      this.setState({ isEmptyUsername: true });
    }
    if (this.state.password === '') {
      this.setState({ isEmptyPassword: true });
    }
    if (this.state.username !== '' && this.state.password !== '') {
      console.log('nice');
    }
  };

  handleUsernameChange = e => {
    this.setState({
      username: e.target.value,
      isEmptyUsername: false,
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value,
      isEmptyPassword: false,
    });
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
