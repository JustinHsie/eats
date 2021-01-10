import * as React from 'react';
import { createElement } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { MenuItemLink, getResources } from 'react-admin';
import DefaultIcon from '@material-ui/icons/ViewList';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AddIcon from '@material-ui/icons/Add';

const Menu = ({ onMenuClick, logout }) => {
  const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const open = useSelector(state => state.admin.ui.sidebarOpen);
  const resources = useSelector(getResources);
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div>
      <MenuItemLink
        key={'home'}
        to="/"
        primaryText="Home"
        leftIcon={<HomeIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
      />
      <MenuItemLink
        key={'search'}
        to="/search"
        primaryText="Search"
        leftIcon={<SearchIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
      />
      <MenuItemLink
        key={'newList'}
        to="/lists/new"
        primaryText="New List"
        leftIcon={<NoteAddIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
      />
      <MenuItemLink
        key={'newPlace'}
        to="/places/new"
        primaryText="New Place"
        leftIcon={<AddIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
      />
      {resources.map(resource => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={
            (resource.options && resource.options.label) ||
            capitalizeFirstLetter(resource.name)
          }
          leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
        />
      ))}
      {isXSmall && logout}
    </div>
  );
};

export default Menu;
