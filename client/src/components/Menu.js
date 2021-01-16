import { Menu as MenuBasic } from 'primereact/menu';
import { TabMenu } from 'primereact/tabmenu';

export const Menu = () => {
  const items = [
    { label: 'Home', icon: 'pi pi-home', url: '/' },
    { label: 'Find Near Me', icon: 'pi pi-search', url: '/find' },
    { label: 'New Place', icon: 'pi pi-plus', url: '/places/new' },
    { label: 'New List', icon: 'pi pi-list', url: '/lists/new' },
  ];

  return <TabMenu className="p-d-flex p-flex-wrap p-jc-center" model={items} />;
};
