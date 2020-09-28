import React from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

class HomeMapSearch extends React.Component {
  componentDidMount() {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
    });

    geocoder.addTo('#geocoder');
    geocoder.setPlaceholder('Enter an address or ZIP');
  }

  render () {
    return (
      <div id="geocoder" />
    );
  }
};

export default HomeMapSearch;