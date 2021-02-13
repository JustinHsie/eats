import React from 'react';
import { RegisterForm } from '../../components/RegisterForm';
import { history } from '../../history';

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordRpt: '',
      isEmptyUsername: false,
      isEmptyPassword: false,
      isSamePassword: true,
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    // Prevent submission if empty username or password or passwords don't match
    if (this.state.username === '') {
      this.setState({ isEmptyUsername: true });
    }
    if (this.state.password === '') {
      this.setState({ isEmptyPassword: true });
    }
    if (this.state.password !== this.state.passwordRpt) {
      this.setState({ isSamePassword: false });
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

    // Compare passwords
    if (e.target.value !== this.state.passwordRpt) {
      this.setState({ isSamePassword: false });
    } else {
      this.setState({ isSamePassword: true });
    }
  };

  handlePasswordRptChange = e => {
    this.setState({
      passwordRpt: e.target.value,
    });

    // Compare passwords
    if (this.state.password !== e.target.value) {
      this.setState({ isSamePassword: false });
    } else {
      this.setState({ isSamePassword: true });
    }
  };

  handleClickLogin = () => {
    history.push('/');
  };

  render() {
    return (
      <RegisterForm
        onSubmit={this.handleSubmit}
        username={this.state.username}
        onUsernameChange={this.handleUsernameChange}
        isEmptyUsername={this.state.isEmptyUsername}
        password={this.state.password}
        onPasswordChange={this.handlePasswordChange}
        isEmptyPassword={this.state.isEmptyPassword}
        passwordRpt={this.state.passwordRpt}
        onPasswordRptChange={this.handlePasswordRptChange}
        isSamePassword={this.state.isSamePassword}
        onClickLogin={this.handleClickLogin}
      />
    );
  }
}
