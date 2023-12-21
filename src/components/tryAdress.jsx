// MapComponent.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 24.799448,
  lng: 120.979021,
};

const MapComponent = () => {
  const [address, setAddress] = useState('');

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk',
    libraries,
  });

  const onPlacesChanged = () => {
    // const places = autocomplete.getPlaces();
    //  setAddress(places[0]?.formatted_address || '');
    
  };

  useEffect(() => {
    if (isLoaded) {
      setupAutocomplete();
    }
  }, [isLoaded]);

  const setupAutocomplete = () => {
    const inputElement = document.getElementById('address-input');
    const autocomplete = new window.google.maps.places.Autocomplete(inputElement, { types: ['address'] });

    autocomplete.addListener('place_changed', onPlacesChanged);
  };

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Google Maps</div>;

  return (
    <div>
      <StandaloneSearchBox
        onLoad={() => setupAutocomplete()}
      >
        <input
          type="text"
          id="address-input"
          placeholder="Enter an address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        
        
        
      </StandaloneSearchBox>
     <input type="checkbox" id="address-selected" name="addressSelected" />
        <label htmlFor="address-selected">Address chosen</label>
        <button disabled={!document.getElementById('address-selected').checked}>
  Continue
</button>
{ !document.getElementById('address-selected').checked && (
    <p style={{ color: 'red' }}>Please choose an address to continue.</p>
  )}
     
    </div>
  );
};

export default MapComponent;