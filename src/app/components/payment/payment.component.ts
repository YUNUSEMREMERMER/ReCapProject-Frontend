import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  
  summary={
      rentDate:"",
      returnDate:"",
      brandName:"",
      color:"",
      modelYear:"",
      dailyPrice:"",
      total:1
  }
  


  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(response => {
       this.summary.rentDate= response["rentDate"];
       this.summary.returnDate= response["returnDate"];
       this.summary.brandName= response["brandName"];
       this.summary.color= response["color"];
       this.summary.modelYear= response["modelYear"];
       this.summary.dailyPrice= response["dailyPrice"];
       this.summary.total= response["total"];
       
      


    });
    

    //this.total=this.summary.returnDate - this.summary.rentDate

  }

}
