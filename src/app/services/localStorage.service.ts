import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable()
export class LocalStorageService {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  store(key: string, value: string) {
    this.storage.set(key, value);
  }

  retrieve(key: string) {
    return this.storage.get(key);
  }

  remove(key: string) {
    this.storage.remove(key);
  }
}