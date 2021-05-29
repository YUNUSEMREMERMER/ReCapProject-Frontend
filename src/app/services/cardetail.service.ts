import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CardetailService {

  apiUrl = 'https://localhost:44397/api/';
  constructor(private httpClient:HttpClient) { }

  getCarDetailsByCarId(id:number):Observable<ListResponseModel<CarDetail>>
  { 
    let newPath = this.apiUrl + "cars/getcardetail?carId="+id
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
 

}
