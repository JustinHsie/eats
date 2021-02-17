import React from 'react';
import { connect } from 'react-redux';
import {
  logout,
  getUser,
  updateUser,
  resetUserForm,
} from '../../redux/actions';
import { User as UserComponent } from '../../components/User';
import { UserContext } from '../App/UserContext';
import { PasswordForm } from '../../components/PasswordForm';

class UserClass extends React.Component {
  constructor(props, context) {
    super(props);
    props.getUser(context);
    this.state = {
      showPasswordForm: false,
      oldPass: '',
      newPass: '',
      newPassRpt: '',
      isEmptyOldPass: false,
      isEmptyNewPass: false,
      isSamePass: true,
      showPassChangeSuccess: false,
    };
  }

  componentDidUpdate(prevProps) {
    // Undisplay form on successful password change
    if (this.props.validOldPass !== prevProps.validOldPass) {
      if (this.props.validOldPass && this.props.validOldPass !== 'initial') {
        this.setState({
          showPasswordForm: false,
          oldPass: '',
          newPass: '',
          newPassRpt: '',
          isEmptyOldPass: false,
          isEmptyNewPass: false,
          isSamePass: true,
          showPassChangeSuccess: true,
        });
      }
    }
  }

  handleLogout = () => {
    this.props.logout();
  };

  handleChangePassword = () => {
    this.setState({ showPasswordForm: true, showPassChangeSuccess: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    const oldPass = this.state.oldPass;
    const newPass = this.state.newPass;
    const newPassRpt = this.state.newPassRpt;

    // Prevent submission if empty inputs or new passwords don't match
    if (oldPass === '') {
      this.setState({ isEmptyOldPass: true });
    }
    if (newPass === '') {
      this.setState({ isEmptyNewPass: true });
    }
    if (newPass !== newPassRpt) {
      this.setState({ isSamePass: false });
    }
    if (oldPass !== '' && newPass !== '') {
      this.props.updateUser(this.context, oldPass, newPass);
    }
  };

  handleOldPassChange = e => {
    this.setState({ oldPass: e.target.value, isEmptyOldPass: false });
  };

  handleNewPassChange = e => {
    this.setState({ newPass: e.target.value, isEmptyNewPass: false });

    // Compare passwords
    if (e.target.value !== this.state.newPassRpt) {
      this.setState({ isSamePass: false });
    } else {
      this.setState({ isSamePass: true });
    }
  };

  handleNewPassRptChange = e => {
    this.setState({ newPassRpt: e.target.value });

    // Compare passwords
    if (this.state.newPass !== e.target.value) {
      this.setState({ isSamePass: false });
    } else {
      this.setState({ isSamePass: true });
    }
  };

  handlePasswordCancel = () => {
    this.setState({
      showPasswordForm: false,
      oldPass: '',
      newPass: '',
      newPassRpt: '',
      isEmptyOldPass: false,
      isEmptyNewPass: false,
      isSamePass: true,
      showPassChangeSuccess: false,
    });
    this.props.resetUserForm();
  };

  render() {
    const passwordForm = (
      <PasswordForm
        onSubmit={this.handleSubmit}
        oldPass={this.state.oldPass}
        onOldPassChange={this.handleOldPassChange}
        validOldPass={this.props.validOldPass}
        isEmptyOldPass={this.state.isEmptyOldPass}
        newPass={this.state.newPass}
        onNewPassChange={this.handleNewPassChange}
        isEmptyNewPass={this.state.isEmptyNewPass}
        newPassRpt={this.state.newPassRpt}
        onNewPassRptChange={this.handleNewPassRptChange}
        isSamePass={this.state.isSamePass}
        onCancelClick={this.handlePasswordCancel}
      />
    );
    return (
      <UserComponent
        username={this.props.user ? this.props.user.username : null}
        showPasswordForm={this.state.showPasswordForm}
        passwordForm={passwordForm}
        showPassChangeSuccess={this.state.showPassChangeSuccess}
        onChangePasswordClick={this.handleChangePassword}
        onPasswordCancel={this.handlePasswordCancel}
        onLogoutClick={this.handleLogout}
      />
    );
  }
}

UserClass.contextType = UserContext;

function mapState(state) {
  const { users } = state;
  return { user: users.user, validOldPass: users.validOldPass };
}

const mapDispatch = {
  logout,
  getUser,
  updateUser,
  resetUserForm,
};

export const User = connect(mapState, mapDispatch)(UserClass);
