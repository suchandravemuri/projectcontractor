import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getEntityDropdownValues(): Observable<any[]> {
    return this.http.get<{ key: string; value: string }[]>('http://localhost:3000/api/locationentity/entities');// Extract the `data` property
  }
}
