import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  private noImagePath: string = "/assets/noimage.jpg";
  
  private id: string;
  private artist: any[];
  private albums: any[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { 
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.spotifyService.getArtist(this.id)
      .subscribe(
        (res: any[]) => this.artist = res,
        err => console.error('Error retrieving artist: ' + JSON.stringify(err)),
        () => console.log('Done retrieving artist.')
      );

    this.spotifyService.getAlbums(this.id)
      .subscribe(
        (res: any) => this.albums = res.items,
        err => console.error('Error retrieving albums: ' + JSON.stringify(err)),
        () => console.log('Done retrieving albums.')
      );
  }
}
