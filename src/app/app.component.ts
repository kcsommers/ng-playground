import { Component, OnInit } from '@angular/core';
import { IBox, IMapOptions, MarkerTypeId } from "angular-maps";
// import { Uuid } from 'src/uuidv4';
import { v4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    console.log(v4());

    // function uuidv4() {
    //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    //     return v.toString(16);
    //   });
    // }

    // console.log(uuidv4());
    // console.log(Uuid.v4());
  }

  private _markerTypeId = MarkerTypeId
  // a little trick so we can use enums in the template...

  private _options: IMapOptions = {
    disableBirdseye: false,
    disableStreetside: false,
    navigationBarMode: 1
  };
  // for all available options for the various components, see IInfoWindowOptions, IInfoWindowAction, IMarkerOptions, IMapOptions, IMarkerIconInfo

  private _click() {
    console.log("hello world...");
  }
}
