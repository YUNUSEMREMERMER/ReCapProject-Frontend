import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44397/api/"

  constructor(private httpClient:HttpClient) { }


  getRentals():Observable<ListResponseModel<RentalDto>>{
    let newPath:string=this.apiUrl+"rentals/getallrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
}

  isRentalable(rental:any):Observable<ResponseModel>{
  let newPath:string=this.apiUrl+"rentals/isRentable"
  return this.httpClient.post<ResponseModel>(newPath,rental); 
}

  addRental(rental:any){
    let newPath:string=this.apiUrl+"rentals/add"
    return this.httpClient.post<ResponseModel>(newPath,rental); 

  }


}
