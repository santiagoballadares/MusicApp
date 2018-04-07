import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  private id: string;
  private album: any[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.spotifyService.getAlbum(this.id)
      .subscribe(
        (res: any[]) => this.album = res,
        err => console.error('Error retrieving albums: ' + JSON.stringify(err)),
        () => console.log('Done retrieving albums.')
      );
  }
}
