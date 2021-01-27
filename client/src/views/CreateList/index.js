import React from 'react';
import { connect } from 'react-redux';
import { createList } from '../../redux/actions';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
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

  handleSetState = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="p-m-6 p-d-flex p-jc-center">
          <div className="card">
            <h2>Create New List</h2>
            <label>
              <h3>Name</h3>
              <InputText
                value={this.state.name}
                onChange={this.handleSetState('name')}
                id="listName"
                className="p-mb-2"
              />
            </label>

            <label>
              <h3>Description</h3>
              <InputTextarea
                rows={5}
                cols={30}
                value={this.state.description}
                onChange={this.handleSetState('description')}
                autoResize
              />
            </label>

            <div>
              <Button
                type="submit"
                className="p-my-5 p-button-success p-button-rounded p-mr-6"
                label="Create List"
              />
              <Button
                type="button"
                className="p-my-5 p-button-rounded "
                label="Add Place"
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapDispatch = {
  createList,
};

export const CreateList = connect(null, mapDispatch)(CreateListClass);
