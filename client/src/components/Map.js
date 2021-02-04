import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 40.78,
      lng: -73.97,
    },
    zoom: 12,
  };

  render() {
    return (
      <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyArq8nOrRdzG-dcq2PhBZsrmzBJzLk2d_M' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={40.7831} lng={-73.9712} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}
