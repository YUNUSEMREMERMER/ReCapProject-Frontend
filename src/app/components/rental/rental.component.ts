import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
import { CardetailService } from 'src/app/services/cardetail.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  carDetails:CarDetail[];
  rentDate:Date;
  returnDate:Date;
  

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
      this.carDetails = response.data
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

    let rental={carId:this.carDetails[0].carId,returnDate:this.returnDate,rentDate:this.rentDate};
    let summary:any={
      rentDate:this.rentDate,
      returnDate:this.returnDate,
      brandName:this.carDetails[0].brandName,
      color:this.carDetails[0].colorName,
      modelYear:this.carDetails[0].modelYear,
      dailyPrice:this.carDetails[0].dailyPrice,
      total:"total"
      
    }
    //let total=((summary.returnDate - summary.rentDate) / (1000 * 60 * 60 * 24));

    //JSON.stringify(summary)
    

    this.rentalService.isRentalable(rental).subscribe(response=>{
      if(response.success && rental.rentDate && rental.returnDate)
      {
        this.toastr.info("araba kiralanmak için uygun" ," Ödeme sayfasına yönlendiriliyorsunuz");
        this.router.navigate(['/payment/',summary.rentDate,summary.returnDate,summary.brandName,summary.color,summary.modelYear,summary.dailyPrice,summary.total]);
      }
      else{
        this.toastr.warning("başlangıç - bitiş tarihleri seçilmeli" );

      }
      
    },responseError=>{
      this.toastr.error("araba o tarihlerde kiralanamaz" ," başarısız");
    })


  }

  
    
    
  





}
