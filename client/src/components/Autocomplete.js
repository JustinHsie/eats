import AcComponent from 'react-google-autocomplete';

export function Autocomplete(props) {
  return (
    <AcComponent
      onPlaceSelected={props.onPlaceSelect}
      types={['establishment']}
      componentRestrictions={{ country: 'US' }}
      fields={['place_id', 'name', 'geometry', 'formatted_address']}
      placeholder="Google Search"
      value={props.locationInput}
      onChange={props.onLocationInputChange}
    />
  );
}
