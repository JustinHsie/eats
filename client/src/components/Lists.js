import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { lists as fakeLists } from '../fakeData/lists';

export const Lists = () => {
  return (
    <div>
      <div className="card">
        <DataTable value={fakeLists} selectionMode="single" dataKey="id">
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
        </DataTable>
      </div>
    </div>
  );
};
