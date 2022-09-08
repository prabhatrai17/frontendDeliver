import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TempPaymentDetail } from '../model/temp-payment-detail';
import { PaymentService } from '../service/payment.service';
@Component({
  selector: 'app-payment-verify',
  templateUrl: './payment-verify.component.html',
  styleUrls: ['./payment-verify.component.css']
})
export class PaymentVerifyComponent implements OnInit {
  paymentVerifyForm!:FormGroup;
  userId:any=5;
  orderId:any=5;
  orderAmount:any=1000;
  response:any=false;
  constructor(private paymentService:PaymentService,private router:Router) { }
  ngOnInit(): void {
    this.paymentVerifyForm = new FormGroup({
      "cvv": new FormControl('',[Validators.required]),
      "cardNo": new FormControl('',[Validators.required]),
      "expiry": new FormControl('',[Validators.required]),
      "pin":new FormControl('',[Validators.required]),
     
    });
  }
  savePayment()
  {
    let payment:TempPaymentDetail={
      cvv:this.paymentVerifyForm.value.cvv,
      cardNo:this.paymentVerifyForm.value.cardNo,
      expiry:this.paymentVerifyForm.value.expiry,
      pin:this.paymentVerifyForm.value.pin,
      
    }
    this.paymentService.validatePayment(payment,this.orderAmount).subscribe((Response)=>{
      console.log(Response);
      this.response=Response;
      
      if(Response){ 
      alert("Payment Successfull");
      this.router.navigate(['home']);//change to
    }
      else
      this.response=true;
     })
    
}

}
