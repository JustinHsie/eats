import React from 'react';
import { connect } from 'react-redux';
import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';
import { getSession } from '../../redux/actions';

class AppClass extends React.Component {
  constructor(props) {
    super(props);
    props.getSession();
  }

  render() {
    return this.props.sessionUserId ? (
      <AuthenticatedApp />
    ) : (
      <UnauthenticatedApp />
    );
  }
}

function mapState(state) {
  const { users } = state;
  return { sessionUserId: users.sessionUserId };
}

const mapDispatch = {
  getSession,
};

export const App = connect(mapState, mapDispatch)(AppClass);
