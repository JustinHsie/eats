import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { db } from '../fakeData/db';

export class CreateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', description: '' };
  }

  handleSubmit = async event => {
    event.preventDefault();
    await db.createList(this.state.name, this.state.description);
    this.props.history.push('/');
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
                onChange={e => this.setState({ name: e.target.value })}
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
                onChange={e => this.setState({ description: e.target.value })}
                autoResize
              />
            </label>

            <div>
              <Button
                type="button"
                className="p-my-5 p-button-rounded p-mr-6"
                label="Add Place"
              />
              <Button
                type="submit"
                className="p-my-5 p-button-success p-button-rounded"
                label="Create List"
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
