import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Rental } from 'src/app/models/rental';
import { SummaryDetail } from 'src/app/models/summaryDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  summary:SummaryDetail
  
  constructor(private activatedRoute:ActivatedRoute,
              private rentalService:RentalService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(response => {
       this.summary = JSON.parse(response['summary'])

    });

    
  }

  addRental(){
      let rental = {
        carId:this.summary.carId,
        customerId:1,
        rentDate:this.summary.rentDate,
        returnDate:this.summary.returnDate

      }

       this.rentalService.addRental(rental).subscribe(response=>{
        if(response.success)
        {
          this.toastrService.success(response.message);
        }
        else{
          this.toastrService.error(response.message);
        }
       
       },ErrorResponse=>{
        this.toastrService.error(ErrorResponse.error.message);

       })
    

  }






}
