import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
import { SummaryDetail } from 'src/app/models/summaryDetail';
import { CardetailService } from 'src/app/services/cardetail.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  carDetail:CarDetail;
  rentDate:Date;
  returnDate:Date;
  summary:SummaryDetail

  constructor(private cardetailService:CardetailService,private activatedRoute:ActivatedRoute,
              private rentalService:RentalService,private toastr:ToastrService, private router:Router,
              ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"])
      }
    })


  }

  getCarDetailsByCarId(id:number) {
    this.cardetailService.getCarDetailsByCarId(id).subscribe(response=>{
      this.carDetail = response.data[0]
    })   
    
  }

  getRentDate(){
    var today  = new Date();
    //min="1980-01-01"
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0,10)
  }
  getReturnDate(){
    var today  = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0,10)
  }

  
  isRentalable(){

    let rentDate = new Date(this.rentDate);
    let returnDate = new Date(this.returnDate);
    let rental={carId:this.carDetail.carId,returnDate:this.returnDate,rentDate:this.rentDate};
     this.summary={
      carId:this.carDetail.carId,
      rentDate:this.rentDate,
      returnDate:this.returnDate,
      brandName:this.carDetail.brandName,
      color:this.carDetail.colorName,
      modelYear:this.carDetail.modelYear,
      dailyPrice:this.carDetail.dailyPrice,
      total:(returnDate.getTime() - rentDate.getTime()) / (24 * 3600 * 1000) * this.carDetail.dailyPrice
      
    }
    

    this.rentalService.isRentalable(rental).subscribe(response=>{
      if(response.success && rental.rentDate && rental.returnDate)
      {
        this.toastr.info("araba kiralanmak için uygun" ," Ödeme sayfasına yönlendiriliyorsunuz");
        this.router.navigate(['/payment/',JSON.stringify(this.summary)]);
      }
      else{
        this.toastr.warning("başlangıç - bitiş tarihleri seçilmeli" );

      }
      
    },responseError=>{
      this.toastr.error("araba o tarihlerde kiralanamaz" ," başarısız");
    })


  }

  
    
    
  





}
