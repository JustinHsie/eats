import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import fakeLists from '../fakeData/lists';

const Lists = () => {
  const onRowSelect = () => {
    console.log('Clicked!');
  };

  return (
    <div>
      <div className="card">
        <DataTable
          value={fakeLists}
          selectionMode="single"
          dataKey="id"
          onRowSelect={onRowSelect}
        >
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Lists;
