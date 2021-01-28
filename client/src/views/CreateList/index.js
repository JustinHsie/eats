import React from 'react';
import { connect } from 'react-redux';
import {history} from '../../history';
import { createList } from '../../redux/actions';
import { CreateListForm } from '../../components/CreateListForm';
import './index.css';

class CreateListClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', description: '' };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.createList(this.state.name, this.state.description);
  };

  handleClickCancel = () => {
    history.push('/');
  };

  handleSetState = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    return (
      <CreateListForm
        state={this.state}
        handleSubmit={this.handleSubmit}
        handleClickCancel={this.handleClickCancel}
        handleSetState={this.handleSetState}
      />
    );
  }
}

const mapDispatch = {
  createList,
};

export const CreateList = connect(null, mapDispatch)(CreateListClass);
