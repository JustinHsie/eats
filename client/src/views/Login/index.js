import React from 'react';
import { connect } from 'react-redux';
import { LoginForm } from '../../components/LoginForm';
import { history } from '../../history';
import { login, resetUserForm } from '../../redux/actions';

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

  // Handle form submit
  handleSubmit = e => {
    // Prevent default DOM submit to let React handle it
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

  // Handle username input change
  handleUsernameChange = e => {
    this.setState({
      username: e.target.value,
      isEmptyUsername: false,
    });
  };

  // Handle password input change
  handlePasswordChange = e => {
    this.setState({
      password: e.target.value,
      isEmptyPassword: false,
    });
  };

  // Handle click register button
  handleClickRegister = () => {
    this.setState({
      username: '',
      password: '',
      isEmptyUsername: false,
      isEmptyPassword: false,
    });
    this.props.resetUserForm();
    history.push('/register');
  };

  render() {
    return (
      <LoginForm
        onSubmit={this.handleSubmit}
        validLogin={this.props.validLogin}
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

// Redux: Map state to props, passes object that contains data component needs
function mapState(state) {
  const { users } = state;
  return { validLogin: users.validLogin };
}

// Redux: Dispatch actions to store
const mapDispatch = {
  login,
  resetUserForm,
};

export const Login = connect(mapState, mapDispatch)(LoginClass);
