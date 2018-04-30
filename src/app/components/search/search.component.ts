import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  private noImagePath: string = "/assets/noimage.jpg";
  
  private loading: boolean = false;
  private searchTerm: string = '';
  private searchResult: any[];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  searchMusic() {
    if (!this.searchTerm) {
      this.searchResult = null;
      return;
    }

    this.loading = true;

    this.spotifyService.search(this.searchTerm)
      .subscribe(
        (res:any) => {
          this.loading = false;
          this.searchResult = res.artists.items;
        },
        err => console.error('Error searching music: ' + JSON.stringify(err)),
        () => console.log('Done searching music.')
      );
  }
}
