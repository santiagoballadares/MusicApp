import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localStorage.service';

@Component({
  selector: 'callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.parseAuthResponse();
  }

  private parseAuthResponse() {
    if (this.router.url.includes('error=')) {
        console.log("callback: error - access denied");
    }

    if (this.router.url.includes('access_token=')) {
      let access_token = this.router.url.replace(/^.+access_token=/,'').replace(/\&.*/,'');
      this.localStorageService.store('access_token', access_token);
    }

    this.router.navigate(['/']);
  }

}
