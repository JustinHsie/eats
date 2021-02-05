import AcComponent from 'react-google-autocomplete';

export function Autocomplete(props) {
  return (
    <AcComponent
      onPlaceSelected={props.onPlaceSelect}
      types={['establishment']}
      componentRestrictions={{ country: 'US' }}
      fields={['place_id', 'name']}
      placeholder="Search"
      value={props.locationName}
      onChange={props.onLocationChange}
    />
  );
}
