// / <reference path="node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { MapModule, MapAPILoader, BingMapAPILoaderConfig, BingMapAPILoader, WindowRef, DocumentRef, MapServiceFactory, BingMapServiceFactory } from "angular-maps";

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { ResizeColumnDirective } from './table/table-resize.directive';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ResizeColumnDirective
  ],
  imports: [
    BrowserModule,
    // MapModule.forRoot()
  ],
  providers: [
    // {
    //   provide: MapAPILoader, deps: [], useFactory: MapServiceProviderFactory
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// export function MapServiceProviderFactory() {
//   let bc: BingMapAPILoaderConfig = new BingMapAPILoaderConfig();
//   bc.apiKey = "..."; // your bing map key
//   bc.branch = "experimental";
//   // to use the experimental bing brach. There are some bug fixes for
//   // clustering in that branch you will need if you want to use
//   // clustering.
//   return new BingMapAPILoader(bc, new WindowRef(), new DocumentRef());
// }
