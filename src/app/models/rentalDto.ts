export interface RentalDto{  
    rentalId:number;
    carName:string;
    userName:string;
    customerName:string;
    rentDate:Date;
    returnDate?:Date;
    totalPrice:number;
}