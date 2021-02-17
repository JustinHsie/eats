import React from 'react';
import { connect } from 'react-redux';
import { RegisterForm } from '../../components/RegisterForm';
import { history } from '../../history';
import { createUser, resetUserForm } from '../../redux/actions';

class RegisterClass extends React.Component {
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
    const username = this.state.username;
    const password = this.state.password;
    const passwordRpt = this.state.passwordRpt;

    // Prevent submission if empty username or password or passwords don't match
    if (username === '') {
      this.setState({ isEmptyUsername: true });
    }
    if (password === '') {
      this.setState({ isEmptyPassword: true });
    }
    if (password !== passwordRpt) {
      this.setState({ isSamePassword: false });
    }
    if (username !== '' && password !== '') {
      this.props.createUser(username, password);
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
    this.setState({
      username: '',
      password: '',
      passwordRpt: '',
      isEmptyUsername: false,
      isEmptyPassword: false,
      isSamePassword: true,
    });
    this.props.resetUserForm();
    history.push('/');
  };

  render() {
    return (
      <RegisterForm
        onSubmit={this.handleSubmit}
        username={this.state.username}
        validRegister={this.props.validRegister}
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

function mapState(state) {
  const { users } = state;
  return { validRegister: users.validRegister };
}

const mapDispatch = {
  createUser,
  resetUserForm,
};

export const Register = connect(mapState, mapDispatch)(RegisterClass);
