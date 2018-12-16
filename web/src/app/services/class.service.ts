import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config/app-config.module';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {

  }

}
