import * as React from 'react';
import { List, Datagrid, ReferenceField, TextField, EditButton } from 'react-admin';

export const PostList = props => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <ReferenceField source="userId" reference="users">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="title" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default PostList;
