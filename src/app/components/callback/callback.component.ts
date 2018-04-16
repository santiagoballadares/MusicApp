import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localStorage.service';

@Component({
  selector: 'callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  private params = {
    access_token: '',
    token_type: '',
    expires_in: '',
    state: '',
    error: ''
  };

  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.clearLocalStorage();
    this.parseAuthorizationResponse();
    this.goToHomePage();
  }

  private clearLocalStorage() {
    this.localStorageService.remove('authorization_time');
    this.localStorageService.remove('access_token');
    this.localStorageService.remove('expires_in_seconds');
    this.localStorageService.remove('error');
  }

  private parseAuthorizationResponse() {
    this.parseUrlParams();
    this.saveParamsInLocalStorage();
  }

  private parseUrlParams() {
    let urlParams = new URLSearchParams(this.router.url.split('#')[1]);
    this.params.access_token = urlParams.get('access_token');
    this.params.token_type = urlParams.get('token_type');
    this.params.expires_in = urlParams.get('expires_in');
    this.params.state = urlParams.get('state');
    this.params.error = urlParams.get('error');
  }

  private saveParamsInLocalStorage() {
    if (this.params.access_token) {
      this.localStorageService.store('access_token', this.params.access_token);
      this.localStorageService.store('expires_in', this.params.expires_in);
      this.localStorageService.store('authorization_time', Date.now().toString());
    }
    else {
      this.localStorageService.store('error', this.getError());
      console.log('authorization error: ' + this.getError());
    }
  }

  private getError() {
    if (this.params.error) {
      return this.params.error;
    }
    return 'unknown error';
  }

  private goToHomePage() {
    this.router.navigate(['/']);
  }
}
