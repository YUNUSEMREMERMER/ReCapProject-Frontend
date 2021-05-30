import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [ 
  {path: '', pathMatch: 'full', component: CarComponent },
  {path: 'tum arabalar',component: CarComponent},
  {path: 'brand',component: BrandComponent},
  {path: 'car/brand/:id',component: CarComponent},
  {path: 'color',component: ColorComponent},
  {path: 'customer',component: CustomerComponent},
  {path: 'carDetail/:id',component: CardetailComponent},
  {path: 'cars/filter/:colorId/:brandId',component: CarComponent},
  {path: 'cars/rental/:carId',component: RentalComponent},
  //{path: 'payment/:rentDate/:returnDate/:brandName/:color/:modelYear/:dailyPrice/:total',component: PaymentComponent},
  {path: 'payment/:summary',component: PaymentComponent},
  {path: 'cars/add',component: CarAddComponent , canActivate:[LoginGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
