import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../model/payment';
import { TempPaymentDetail } from '../model/temp-payment-detail';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient)
    {

    }
    getPaymentById(id:number):Observable<Payment>
      {
        return this.httpClient.get<Payment>(`http://localhost:8080/payment/${id}`,{
          headers : new HttpHeaders().set('Content-Type','application/json'),
        });
      }

    savePayment(payment:Payment):Observable<any>{
      return this.httpClient.post<any>(`http://localhost:8081/savepayment`,payment,{
      headers : new HttpHeaders().set('Content-Type','application/json'),
      });
    }
    validatePayment(payment:TempPaymentDetail,orderAmount:any):Observable<any>{
      console.log("inside validate service");
      console.log(payment);
      return this.httpClient.post(`http://localhost:8080/payment_validate/${orderAmount}`,payment);
      // headers : new HttpHeaders().set('Content-Type','application/json'),
      
    }

    getPayments():Observable<any>{
      return this.httpClient.get("http://localhost:8081/payments");
    }
    PaymentSelectedEvent = new EventEmitter<Payment>();

  }
