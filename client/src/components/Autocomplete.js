import AutocompleteComp from 'react-google-autocomplete';

export function Autocomplete(props) {
  return (
    <AutocompleteComp
      onPlaceSelected={props.onPlaceSelected}
      types={['establishment']}
      componentRestrictions={{ country: 'US' }}
      fields={['place_id', 'geometry', 'name']}
      placeholder=""
    />
  );
}
