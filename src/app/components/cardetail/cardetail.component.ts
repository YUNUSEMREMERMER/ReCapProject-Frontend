import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CardetailService } from 'src/app/services/cardetail.service';




@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  carDetails:CarDetail[] ;
  constructor(private cardetailService:CardetailService,private activatedRoute:ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getCarDetailsByCarId(params["id"])
      }
    })

    
  }

  getCarDetailsByCarId(id:number) {
    this.cardetailService.getCarDetailsByCarId(id).subscribe(response=>{
      this.carDetails = response.data
    })   
    
  }
  


}
