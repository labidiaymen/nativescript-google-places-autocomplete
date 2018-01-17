import { Observable } from 'tns-core-modules/data/observable';
import { PLACES_API_URL, PLACES_DETAILS_API_URL_places } from './google-places-autocomplete.static';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import * as http from 'tns-core-modules/http';

export class Common extends Observable {
  private apikey: string;
  constructor(key: string) {
    super();
    this.apikey = key;
  }
  public search(terms: string) {
    let requestUrl = PLACES_API_URL +
      "?input=" + encodeURIComponent(terms.trim()) +
      "&types=geocode&key=" +
      this.apikey;
    return http
      .getJSON(requestUrl)
      .then(function (data: any) {
        let items = []
        for (let i = 0; i < data.predictions.length; i++) {
          items.push({
            description: data.predictions[i].description,
            placeId: data.predictions[i].place_id,
            data: data.predictions[i]
          })
        }
        return items
      })
  }
  public getPlaceById(placeId: any) {
    let requestUrl = PLACES_DETAILS_API_URL_places +
      "?placeid=" + placeId + "&key=" +
      this.apikey;
    return http
      .getJSON(requestUrl)
      .then((data: any) => {
        let place: any = {}
        place.latitude = data.result.geometry.location.lat
        place.longitude = data.result.geometry.location.lng
        place.name = data.result.name
        place.phoneNumber = data.result.international_phone_number
        place.formattedAddress = data.result.formatted_address
        place.data = data;
        if (data.result.photos && data.result.photos.length > 0) {
          place.photoReference = data.result.photos[0].photo_reference
        }
        return place
      })
  }
  private handleErrors(response) {
    if (!response.result) {
      console.log("google-geocoder error")
      console.log(JSON.stringify(response));
    }
    return response;
  }
}
