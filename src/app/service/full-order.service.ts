import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FullOrder } from '../model/full-order';
import { Observable } from 'rxjs';
// import { ChangeDetectorRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullOrderService {

  constructor(private httpClient:HttpClient) { 
    
  }
  private baseUrl="http://localhost:8080";
  addFullOrder(fullOrder:FullOrder):Observable<any>{
    console.log("full order before pass");
    console.log(fullOrder);
      return this.httpClient.post(`${this.baseUrl}/place_order`,fullOrder);
  }

  getOrder(orderId:number):Observable<any>{
     return this.httpClient.get(`${this.baseUrl}/orders/${orderId}`);
  }
  //get all order by user
  getOrders(userId:number):Observable<any>{
    console.log("user id before pass to get all orders: "+userId);
    return this.httpClient.get(`${this.baseUrl}/orders/${userId}`);
 }
 //get all order order
 getAllOrders():Observable<any>{
  console.log(" before pass to get all orders: ");
  return this.httpClient.get(`${this.baseUrl}/orders`);
}

//update order order
updateOrderStatus(obj:any,orderId:any):Observable<any>{
  console.log(" before pass  orders: ");
  console.log(obj);
  // var headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  return this.httpClient.post<any>(`${this.baseUrl}/status-update/${orderId}`,obj);
}
}
