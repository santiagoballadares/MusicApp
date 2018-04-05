import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../../../Artist';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  searchResponse: Artist[];

  constructor(private spotifyService: SpotifyService) {
    this.searchTerm = '';
  }

  ngOnInit() {
  }

  searchMusic() {
    if (!this.searchTerm) {
      this.searchResponse = [];
      return;
    }

    this.spotifyService.searchMusic(this.searchTerm)
      .subscribe(
        (res:any) => this.searchResponse = res.artists.items,
        err => {
          console.error('Error searching music: ' + JSON.stringify(err)); 
          this.spotifyService.renewToken();
        },
        () => console.log('Done searching music.')
      );
  }
}
