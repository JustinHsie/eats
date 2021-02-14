import React from 'react';
import { connect } from 'react-redux';
import { LoginForm } from '../../components/LoginForm';
import { history } from '../../history';
import { login } from '../../redux/actions';

class LoginClass extends React.Component {
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

    const username = this.state.username;
    const password = this.state.password;
    // Prevent submission if empty username or password
    if (username === '') {
      this.setState({ isEmptyUsername: true });
    }
    if (password === '') {
      this.setState({ isEmptyPassword: true });
    }
    if (username !== '' && password !== '') {
      this.props.login(username, password);
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

  handleClickRegister = () => {
    history.push('/register');
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
        onClickRegister={this.handleClickRegister}
      />
    );
  }
}

const mapDispatch = {
  login,
};

export const Login = connect(null, mapDispatch)(LoginClass);
