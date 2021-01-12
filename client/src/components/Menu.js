import { Menu as MenuBasic } from 'primereact/menu';

export const Menu = () => {
  const items = [
    { label: 'Home', icon: 'pi pi-home', url: '/' },
    { label: 'Search', icon: 'pi pi-search', url: '/search' },
    { label: 'New Place', icon: 'pi pi-plus', url: '/places/new' },
    { label: 'New List', icon: 'pi pi-list', url: '/lists/new' },
  ];

  return <MenuBasic model={items} />;
};
