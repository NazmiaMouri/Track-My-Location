import React from 'react';
import { geolocated } from 'react-geolocated';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const DEFAULT_LATITUDE = 48;
const DEFUALT_LANGITUDE = -123;

class App extends React.Component {


  render() {
    const latitude = this.props.coords ? this.props.coords.latitude : DEFAULT_LATITUDE;
    const longitude = this.props.coords ? this.props.coords.longitude : DEFUALT_LANGITUDE;
    return (
      <Map center={[latitude, longitude]} zoom={12} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {
          !this.props.coords &&
          <div > Loading ...</div>
        }
        {
          this.props.coords &&
          <Marker
            position={[latitude, longitude]} >
            <Popup>
              <div>You are here!</div>
            </Popup>

          </Marker>
        }

      </Map >
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 10000,
})(App);