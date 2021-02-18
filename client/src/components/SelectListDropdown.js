import { Dropdown } from 'primereact/dropdown';

export function SelectListDropdown(props) {
  return (
    <span>
      <Dropdown
        value={props.selected}
        options={props.lists}
        onChange={props.onSelectChange}
        optionLabel="name"
        placeholder={props.placeholder || 'Select a List'}
        className={`p-mb-2 ${props.isListSelected ? '' : 'p-invalid'}`}
      />
      {props.isListSelected ? null : (
        <small id="username-help" className="p-error p-d-block">
          Please select a list
        </small>
      )}
    </span>
  );
}
