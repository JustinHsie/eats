import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../history';
import { Menu as MenuComponent } from '../../components/Menu';
import { setMenuTab } from '../../redux/actions';
import './index.css';

export class MenuClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'Home' };
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => history.push('/'),
      },
      {
        label: 'Find Near Me',
        icon: 'pi pi-search',
        command: () => history.push('/find'),
      },
      {
        label: 'New Place',
        icon: 'pi pi-plus',
        command: () => history.push('/places/new'),
      },
      {
        label: 'New List',
        icon: 'pi pi-list',
        command: () => history.push('/lists/new'),
      },
      {
        label: 'User',
        icon: 'pi pi-user',
        command: () => history.push('/user'),
      },
    ];
  }

  componentDidMount() {
    this.getMenuIndex();
  }

  componentDidUpdate(prevProps) {
    if (this.props.menuLabel !== prevProps.menuLabel) {
      this.getMenuIndex();
    }
  }

  handleOnTabChange = e => {
    const label = e.value.label;
    this.props.setMenuTab(label);
  };

  getMenuIndex = () => {
    const label = this.props.menuLabel;
    const index = this.items.findIndex(item => item.label === label);
    this.setState({ activeItem: this.items[index] });
  };

  render() {
    return (
      <MenuComponent
        model={this.items}
        activeItem={this.state.activeItem}
        onTabChange={this.handleOnTabChange}
      />
    );
  }
}

function mapState(state) {
  const { menu } = state;
  return { menuLabel: menu.menuLabel };
}

const mapDispatch = {
  setMenuTab,
};

export const Menu = connect(mapState, mapDispatch)(MenuClass);
