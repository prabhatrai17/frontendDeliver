import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  API ="http://localhost:8080"

  constructor(private http:HttpClient) { }

  public saveVehicle(data:any) {
    return this.http.post(this.API + "/add_vehicle",data);
  }

  //get all vehicle
  public getVehicle() {
    return this.http.get(this.API + "/vehicle")
  }
  public getVehicleByUserEmail(userEmail:any) {
    return this.http.get(`${this.API}/vehicle/${userEmail}`);
  }
//get vehicle by userID
  public getVehicleByUserId(userId:any) {
    console.log("get vehicle by userId called");
    return this.http.get(`${this.API}/vehicle-driver/${userId}`);
  }
  public deleteVehicle(id:any) {
    return this.http.delete(this.API + '/deleteVehicle?id=' + id);
  }
//service to get order assigned to driver
  getDriverAssignedOrders(userId:number):Observable<any>{
    console.log("user id before pass to get all driver orders: "+userId);
    return this.http.get(`${this.API}/driver/orders/${userId}`);
 }
}
