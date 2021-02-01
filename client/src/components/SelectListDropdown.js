import { Dropdown } from 'primereact/dropdown';

export function SelectListDropdown(props) {
  return (
    <Dropdown
      value={props.selected}
      options={props.lists}
      onChange={props.onSelectChange}
      optionLabel="name"
      placeholder={props.placeholder || 'Select a List'}
      className="p-mb-2"
    />
  );
}
