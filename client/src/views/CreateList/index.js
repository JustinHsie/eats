import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../history';
import { createList, setMenuTab } from '../../redux/actions';
import { CreateListForm } from '../../components/CreateListForm';
import './index.css';

class CreateListClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', description: '' };
    this.props.setMenuTab('New List');
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
        onSubmit={this.handleSubmit}
        name={this.state.name}
        onNameChange={this.handleSetState}
        description={this.state.description}
        onDescriptionChange={this.handleSetState}
        onButtonCancelClick={this.handleClickCancel}
      />
    );
  }
}

const mapDispatch = {
  createList,
  setMenuTab,
};

export const CreateList = connect(null, mapDispatch)(CreateListClass);
