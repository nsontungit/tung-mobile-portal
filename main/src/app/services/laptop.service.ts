import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResult } from '../models/api-result';
import { Laptop, LaptopDto } from '../models/laptop';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  private host_url: string = 'http://localhost:5000/api/laptops';

  constructor(private http: HttpClient) { }

  getOne() {
    return this.http.get<Laptop>(`${this.host_url}`)
        .pipe(map (e => e));
  }

  getAll(): Observable<Laptop[]> {
    return this.http.get<ApiResult>(`${this.host_url}`)
        .pipe(map (e => e.data as Laptop[]));
  }

  createOne(formData): Observable<ApiResult> {
    return this.http.post<ApiResult>(`${this.host_url}`, formData);
  }
}
