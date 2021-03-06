import React from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = () => (
  <i className="pi pi-map-marker" style={{ fontSize: '3em', color: '#fc3903' }}></i>
);

const defaultProps = {
  center: {
    lat: 40.78,
    lng: -73.97,
  },
  zoom: 12,
};

export function Map(props) {
  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={props.center}
        zoom={props.center ? 15 : defaultProps.zoom}
      >
        {props.center && (
          <Marker
            lat={props.center ? props.center.lat : defaultProps.center.lat}
            lng={props.center ? props.center.lng : defaultProps.center.lng}
          />
        )}
      </GoogleMapReact>
    </div>
  );
}
