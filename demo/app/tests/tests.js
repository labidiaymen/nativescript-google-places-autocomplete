var GooglePlacesAutocomplete = require("nativescript-google-places-autocomplete").GooglePlacesAutocomplete;
var googlePlacesAutocomplete = new GooglePlacesAutocomplete();

describe("greet function", function() {
    it("exists", function() {
        expect(googlePlacesAutocomplete.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(googlePlacesAutocomplete.greet()).toEqual("Hello, NS");
    });
});