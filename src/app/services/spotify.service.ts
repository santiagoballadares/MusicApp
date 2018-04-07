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
    private token: string;

    constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {
        this.apiRoot = 'https://api.spotify.com/v1';
        this.authUrl = 'https://accounts.spotify.com/authorize';
        this.clientId = '4fcd3d6dda9c4a19a8624a284c2bcca3';
        this.responseType = 'token';
        this.redirectUri = 'http://localhost:4200/callback';
        
        this.authenticate();
        
        console.log("SpotifyService initialized...");
    }

    private authenticate() {
        if (this.localStorageService.retrieve('access_token')) {
            this.token = 'Bearer ' + this.localStorageService.retrieve('access_token');
        }
        else {
            window.location.href = 
                `${this.authUrl}?client_id=${this.clientId}&response_type=${this.responseType}&redirect_uri=${this.redirectUri}`;
        }
    }

    renewToken() {
        this.localStorageService.remove('access_token');
        this.renewToken();
    }

    search(term: string, type='artist', market='US', offset=0, limit=20) {
        let searchUrl = 
            `${this.apiRoot}/search?q=${term}&type=${type}&market=${market}&offset=${offset}&limit=${limit}`;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.token);
        
        return this.httpClient.get(searchUrl, { headers });
    }

    getArtist(id: string) {
        let artistUrl = `${this.apiRoot}/artists/${id}`;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.token);

        return this.httpClient.get(artistUrl, { headers });
    }

    getAlbums(artistId: string) {
        let albumsUrl = `${this.apiRoot}/artists/${artistId}/albums`;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.token);

        return this.httpClient.get(albumsUrl, { headers });
    }

    getAlbum(id: string) {
        let albumUrl = `${this.apiRoot}/albums/${id}`;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.token);

        return this.httpClient.get(albumUrl, { headers });
    }
}
