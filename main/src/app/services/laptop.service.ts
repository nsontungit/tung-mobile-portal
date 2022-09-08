import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResult } from '../models/api-result';
import { Paging } from '../models/common';
import { Laptop, LaptopDto } from '../models/laptop';
import { Option } from '../models/option';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  private laptop_suffix: string = 'api/laptops';
  private product_url: string = `${environment.productUrl}`;

  constructor(private http: HttpClient) { }

  getOne() {
    return this.http.get<Laptop>(`${this.product_url}/${this.laptop_suffix}`)
        .pipe(map (e => e));
  }

  getAll(pageSize: number, pageNumber: number): Observable<Paging<Laptop>> {
    return this.http.get<ApiResult>(`${this.product_url}/${this.laptop_suffix}?pageSize=${pageSize}&pageNumber=${pageNumber}`)
        .pipe(map (e => e.data as Paging<Laptop>));
  }

  getOptions(type: string): Observable<Option[]> {
    return this.http.get<ApiResult>(`${this.product_url}/${this.laptop_suffix}/options/${type}`)
        .pipe(map (e => e.data as Option[]));
  }

  getLaptopBrandOptions(): Observable<Option[]> {
    return this.http.get<ApiResult>(`${this.product_url}/${this.laptop_suffix}/options/laptop-brand`)
        .pipe(map (e => e.data as Option[]));
  }

  getAllOptions(): Observable<Option[]> {
    return this.http.get<ApiResult>(`${this.product_url}/${this.laptop_suffix}/options`)
        .pipe(map (e => e.data as Option[]));
  }

  createOne(formData): Observable<ApiResult> {
    return this.http.post<ApiResult>(`${this.product_url}/${this.laptop_suffix}`, formData);
  }
}
