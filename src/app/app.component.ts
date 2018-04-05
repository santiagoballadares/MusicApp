import { Component } from '@angular/core';

import { SpotifyService } from './services/spotify.service';
import { LocalStorageService } from './services/localStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SpotifyService, LocalStorageService ]
})
export class AppComponent {
  title = 'MusicApp';
}
