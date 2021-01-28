import { Dropdown } from 'primereact/dropdown';

export function SelectListDropdown(props) {
  return (
    <Dropdown
      value={props.state.selectedList}
      options={props.lists}
      onChange={props.handleSetState('selectedList')}
      optionLabel="name"
      placeholder={props.placeholder || 'Select a List'}
      className="p-mb-2"
    />
  );
}
