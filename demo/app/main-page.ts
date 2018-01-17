import { Observable } from 'tns-core-modules/data/observable';
import { GooglePlacesAutocomplete } from 'nativescript-google-places-autocomplete';

import { Subject } from "rxjs";
import { TextField } from "tns-core-modules/ui/text-field";
import { ListView } from "tns-core-modules/ui/list-view";
import {
    EventData,
} from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import * as dialogs from 'tns-core-modules/ui/dialogs';

let API_KEY = "AIzaSyAOYKrNk8B72AcOnF9SD3WjcemZHmuUcRY";
let googlePlacesAutocomplete = new GooglePlacesAutocomplete(API_KEY);;
class HelloWorldModel extends Observable {
    private googlePlacesAutocomplete: GooglePlacesAutocomplete;
    private page: Page;
    private events;
    searchInput = new Subject<string>();
    items;

    constructor() {
        super();
        this.searchInput
            .debounceTime(700)
            .distinctUntilChanged()
            .subscribe(
            (params: any) => {
                let list = <ListView>this.page.getViewById("places_list");
                googlePlacesAutocomplete.search(params)
                    .then((places: any) => {
                        console.log(JSON.stringify(places));
                        this.items = [];
                        this.items = places;
                        this.set('items', this.items);
                        list.items = this.items;
                        list.refresh();
                    }, (error => {
                        console.log(error)
                    }));
            },
            error => {
                console.log(error);
            }
            );
    }

    getPlace(place) {

        googlePlacesAutocomplete.getPlaceById(place.placeId).then((place) => {
            console.log(JSON.stringify(place));
            dialogs.alert("Frmatted address :" + place.formattedAddress + "\n latitude: " + place.latitude + "\n longitude: " + place.longitude)
                .then(function () { });
        }, error => {
            console.log(error)
        })
    }

    public searchFieldChanged(args: EventData) {
        var tmptextfield = <TextField>args.object
        this.searchInput
            .next(tmptextfield.text)
    }

    listViewItemTap(args) {
        this.getPlace(this.items[args.index]);
    }

    public bindEvents(events) {
        events.forEach((event) => {
            const view = this.page.getViewById(event.viewID);
            if (view) {
                view.on(event.eventName, event.eventHandler, this);
            } else {
                console.log("Error while attempting to bind view with id "
                    + event.viewID);
            }
        });
        return events;
    }

    public pageLoaded(args: EventData): void {
        this.page = (args.object as Page);
        this.page.bindingContext = this;
        this.events = this.bindEvents(
            [{
                eventName: "textChange",
                viewID: "searchField",
                eventHandler: this.searchFieldChanged
            }
            ]);

    }
}


const helloWorldModel = new HelloWorldModel();
export const pageLoaded = (args) => helloWorldModel.pageLoaded(args);
export const listViewItemTap = (args) => helloWorldModel.listViewItemTap(args);