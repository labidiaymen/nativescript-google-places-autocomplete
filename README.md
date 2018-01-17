

# Nativescript Google Places Autocomplete

Ò[![npm version](https://badge.fury.io/js/nativescript-google-places-autocomplete.svg)](https://badge.fury.io/js/nativescript-google-places-autocomplete)
[![Twitter Follow][twitter-image]][twitter-url]

[twitter-image]:https://img.shields.io/twitter/follow/labidiaymen.svg?style=social&label=Follow%20me
[twitter-url]:https://twitter.com/labidiaymen


Add location autocomplete to your Nativescript application

![](https://user-images.githubusercontent.com/3775924/35034560-e0519724-fb6e-11e7-857c-0caaa6499d6a.gif)
## Prerequisites 

Create and grap your Api key from  [https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en)

## Installation

```javascript
tns plugin add nativescript-google-places-autocomplete
```

## Usage 
	
```javascript
    import { GooglePlacesAutocomplete } from 'nativescript-google-places-autocomplete';
	
	let API_KEY = "your_api_Key";
	let googlePlacesAutocomplete = new GooglePlacesAutocomplete(API_KEY);

	googlePlacesAutocomplete.search(params)
	      .then((places: any) => {
		      // place predictions list
           }, (error => {
              console.log(error)
          }));
          
	googlePlacesAutocomplete.getPlaceById(place.placeId).then((place) => {
	   .then(function () { });
        }, error => {
            console.log(error)
        })        
```
Plugin Auther : [Aymen Labidi](https://aymen.co)

    
## License

Apache License Version 2.0, January 2004
