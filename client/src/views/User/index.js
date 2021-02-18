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
import { Toast } from 'primereact/toast';

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
    };
    this.toast = React.createRef();
  }

  componentDidUpdate(prevProps) {
    // Undisplay form on successful password change
    if (this.props.validOldPass !== prevProps.validOldPass) {
      if (this.props.validOldPass) {
        this.setState({
          showPasswordForm: false,
          oldPass: '',
          newPass: '',
          newPassRpt: '',
          isEmptyOldPass: false,
          isEmptyNewPass: false,
          isSamePass: true,
        });
        // Show toast on successful password change
        if (this.props.validOldPass !== 'initial') {
          this.showToast();
        }
        this.props.resetUserForm();
      }
    }
  }

  handleLogout = () => {
    this.props.logout();
  };

  handleChangePassword = () => {
    this.setState({ showPasswordForm: true });
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
    });
    this.props.resetUserForm();
  };

  showToast = () => {
    this.toast.current.show({
      severity: 'success',
      summary: 'Success!',
      detail: 'Password Changed',
      life: 3000,
    });
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
      <div>
        <Toast ref={this.toast} />
        <UserComponent
          username={this.props.user ? this.props.user.username : null}
          showPasswordForm={this.state.showPasswordForm}
          passwordForm={passwordForm}
          onChangePasswordClick={this.handleChangePassword}
          onPasswordCancel={this.handlePasswordCancel}
          onLogoutClick={this.handleLogout}
        />
      </div>
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
