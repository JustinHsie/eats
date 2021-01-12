import { Menu } from 'primereact/menu';

const MyMenu = () => {
  const items = [
    { label: 'Home', icon: 'pi pi-home', url: '/' },
    { label: 'Search', icon: 'pi pi-search', url: '/search' },
    { label: 'New Place', icon: 'pi pi-plus', url: '/places/new' },
    { label: 'New List', icon: 'pi pi-list', url: '/lists/new' },
  ];

  return <Menu model={items} />;
};

export default MyMenu;
