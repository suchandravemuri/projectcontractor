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
    return this.http.get<{ key: string; value: string }[]>('http://localhost:3000/api/locationentity/entities');
  }

  getLocationDropdownValues(): Observable<any[]> {
    return this.http.get<{ key: string; value: string }[]>('http://localhost:3000/api/locationentity/locations');
  }

  getContractorDropdownValues(): Observable<any[]> {
    return this.http.get<{ key: string; value: string }[]>('http://localhost:3000/api/contractors/getContractors');
  }

  getContractorWorkOrderDropdownValues(location: string): Observable<any[]> {
    return this.http.get<{ key: string; value: string }[]>(
      `http://localhost:3000/api/contractors/getContractorsWorkOrderMapping?location=${encodeURIComponent(location)}`
    );
  }
}
