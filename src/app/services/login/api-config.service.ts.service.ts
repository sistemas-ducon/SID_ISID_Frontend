import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigServiceTsService {
  readonly apiUrl = environment.apiUrl;
  constructor() { }
}
