import React from 'react';
import { connect } from 'react-redux';
import { history } from '../history';
import { getLists } from '../redux/actions';
import { Card } from 'primereact/card';
import '../styles/Lists.css';

export class Lists extends React.Component {
  componentDidMount() {
    this.props.getLists();
  }

  makeCards() {
    const cards = this.props.lists.map(list => {
      return (
        <div onClick={() => history.push(`/lists/${list.id}`)} key={list.id}>
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
  }

  displayLists() {
    if (this.props.lists) {
      return (
        <div className="p-d-flex p-jc-center p-flex-wrap">
          {this.makeCards()}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.displayLists()}
        <div
          onClick={() => history.push('/lists/new')}
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

function mapState(state) {
  const { lists } = state;
  return { lists: lists.allLists };
}

const mapDispatch = {
  getLists,
};

export default connect(mapState, mapDispatch)(Lists);
