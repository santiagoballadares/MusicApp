import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule } from 'angular-webstorage-service';
import { RoutingModule } from './app.routing';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/about/about.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { CallbackComponent } from './components/callback/callback.component';


import { SpotifyService } from './services/spotify.service';
import { LocalStorageService } from './services/localStorage.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    AboutComponent,
    ArtistComponent,
    AlbumComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StorageServiceModule,
    RoutingModule
  ],
  providers: [
    SpotifyService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
