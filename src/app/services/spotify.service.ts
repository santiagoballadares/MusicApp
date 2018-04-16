import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { LocalStorageService } from '../services/localStorage.service';

@Injectable()
export class SpotifyService {
  private apiRoot: string;
  private authUrl: string;
  private clientId: string;
  private responseType: string;
  private redirectUri: string;
  private state: string;
  private token: string;

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {
    this.apiRoot = 'https://api.spotify.com/v1';
    this.authUrl = 'https://accounts.spotify.com/authorize';
    this.clientId = '4fcd3d6dda9c4a19a8624a284c2bcca3';
    this.responseType = 'token';
    this.redirectUri = 'http://localhost:4200/callback';
    this.state = 'musicapp_local_session';
    
    this.authenticate();
    
    console.log("SpotifyService initialized...");
  }

  private authenticate() {
    if (this.isTokenValid()) {
      this.token = 'Bearer ' + this.localStorageService.retrieve('access_token');
    }
    else {
      this.requestAuthentication();
    }
  }

  private isTokenValid() {
    if (!this.localStorageService.retrieve('access_token')) {
      return false;
    }

    let authorizationTime = parseInt(this.localStorageService.retrieve('authorization_time'));
    let elapsedTime = Math.floor( (Date.now() - authorizationTime)/1000 ) ;
    let tokenLifetime = parseInt(this.localStorageService.retrieve('expires_in'));

    if (elapsedTime >= tokenLifetime) {
      return false;
    }
    
    return true;
  }

  private requestAuthentication() {
    window.location.href = `${this.authUrl}?client_id=${this.clientId}&response_type=${this.responseType}&redirect_uri=${this.redirectUri}&state=${this.state}`;
  }

  private getHeaders() {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.token);
    
    return { headers };
  }

  search(term: string, type='artist', market='US', offset=0, limit=20) {
    let searchUrl = 
      `${this.apiRoot}/search?q=${term}&type=${type}&market=${market}&offset=${offset}&limit=${limit}`;

    return this.httpClient.get(searchUrl, this.getHeaders());
  }

  getArtist(id: string) {
    let artistUrl = `${this.apiRoot}/artists/${id}`;

    return this.httpClient.get(artistUrl, this.getHeaders());
  }

  getAlbums(artistId: string) {
    let albumsUrl = `${this.apiRoot}/artists/${artistId}/albums`;

    return this.httpClient.get(albumsUrl, this.getHeaders());
  }

  getAlbum(id: string) {
    let albumUrl = `${this.apiRoot}/albums/${id}`;

    return this.httpClient.get(albumUrl, this.getHeaders());
  }
}
