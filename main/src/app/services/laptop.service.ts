import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Laptop } from '../models/laptop';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  constructor(private http: HttpClient) { }

  getOne() {
    return this.http.get<Laptop>(`http://localhost:5000/api/laptops`).pipe(map (e => e));
  }
}
