import React from 'react';
import { Card } from 'primereact/card';
import '../styles/Lists.css';
import { db } from '../fakeData/db';

export class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lists: [] };
  }

  componentDidMount() {
    this.getLists();
  }

  getLists = async () => {
    const lists = await db.getLists();
    this.setState({ lists: lists });
  };

  handleClickCard = id => () => {
    this.props.history.push(`/lists/${id}`);
  };

  handleClickCreateList = () => {
    this.props.history.push('/lists/new');
  };

  makeCards() {
    const cards = this.state.lists.map(list => {
      return (
        <div onClick={this.handleClickCard(list.id)} key={list.id}>
          <Card
            className="p-m-2 card_min_width p-link card_background_light p-d-flex p-jc-center"
            title={list.name}
          >
            {list.description}
          </Card>
        </div>
      );
    });
    return cards;
  };

  displayLists() {
    if (this.state.lists.length !== 0) {
      return (
        <div className="p-d-flex p-jc-center p-flex-wrap">
          {this.makeCards()}
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {this.displayLists()}
        <div
          onClick={this.handleClickCreateList}
          className="p-d-flex p-jc-center"
        >
          <Card
            className="p-m-2 card_min_width p-link card_background_dark p-d-flex p-jc-center"
            title="Create List"
          >
            <i className="pi pi-plus p-d-flex p-jc-center" />
          </Card>
        </div>
      </div>
    );
  }
}
