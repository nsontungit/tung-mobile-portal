import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResult } from '../models/api-result';
import { Laptop, LaptopDto } from '../models/laptop';
import { Option } from '../models/option';

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

  getOptions(type: string): Observable<Option[]> {
    return this.http.get<ApiResult>(`${this.host_url}/options/${type}`)
        .pipe(map (e => e.data as Option[]));
  }

  getLaptopBrandOptions(): Observable<Option[]> {
    return this.http.get<ApiResult>(`${this.host_url}/options/laptop-brand`)
        .pipe(map (e => e.data as Option[]));
  }

  getAllOptions(): Observable<Option[]> {
    return this.http.get<ApiResult>(`${this.host_url}/options`)
        .pipe(map (e => e.data as Option[]));
  }

  createOne(formData): Observable<ApiResult> {
    return this.http.post<ApiResult>(`${this.host_url}`, formData);
  }
}
