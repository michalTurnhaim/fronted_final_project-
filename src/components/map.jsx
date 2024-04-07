import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TextField from '@mui/material/TextField';

function EventAddressInput({ setMyObj, myObj }) {
    const handleChange = (address) => {
        setMyObj({ ...myObj, AdressOfEvent: address });
    };

    const handleSelect = async (address) => {
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0]);
        console.log('Latlng:', latLng);
    };

    return (
        <PlacesAutocomplete
            value={myObj.AdressOfEvent}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <TextField
                        {...getInputProps({
                            placeholder: 'הזן את כתובת האירוע...',
                            className: 'location-search-input',
                        })}
                        label="כתובת הארוע"
                        variant="outlined"
                        fullWidth
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>טוען...</div>}
                        {suggestions.map((suggestion) => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
}

export default EventAddressInput;
