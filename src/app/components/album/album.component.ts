import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Album } from '../../../../Album';

@Component({
  selector: 'album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  id: string;
  album: Album[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.spotifyService.getAlbum(this.id)
      .subscribe(
        (res: Album[]) => this.album = res,
        err => console.error('Error retrieving albums: ' + JSON.stringify(err)),
        () => console.log('Done retrieving albums.')
      );
  }
}
