import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44397/api/';
  
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>>
  {
    let newPath = this.apiUrl + "cars/getallcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
 
  getCarsByBrandId(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcarbybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
    
  }
  getCarsByColorId(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcarbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
    
  }
  getCarsBySelect(brandId:number, colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath =this.apiUrl + "cars/getbyselected?brandId="+brandId+"&colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
     return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car);
  }

 
}
