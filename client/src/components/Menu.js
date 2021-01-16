import { TabMenu } from 'primereact/tabmenu';
import { useHistory } from 'react-router-dom';

export const Menu = () => {
  const history = useHistory();
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: event => history.push('/'),
    },
    {
      label: 'Find Near Me',
      icon: 'pi pi-search',
      command: event => history.push('/find'),
    },
    {
      label: 'New Place',
      icon: 'pi pi-plus',
      command: event => history.push('/places//new'),
    },
    {
      label: 'New List',
      icon: 'pi pi-list',
      command: event => history.push('/lists/new'),
    },
  ];

  return (
    <TabMenu className="p-d-flex p-flex-wrap p-jc-center p-m-2" model={items} />
  );
};
