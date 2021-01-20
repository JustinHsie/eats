import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { database } from '../fakeData/database';
import { Database } from '../classes/database';

export class CreateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', description: '' };
  }

  handleSubmit = event => {
    event.preventDefault();
    const list = {
      title: this.state.title,
      description: this.state.description,
      places: new Database(),
    };
    database.lists.addItem(list);
    this.props.history.push('/');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="p-m-6 p-d-flex p-jc-center">
          <div className="card">
            <h2>Create New List</h2>
            <label>
              <h3>Title</h3>
              <InputText
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
                id="listTitle"
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
