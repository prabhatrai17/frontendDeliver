import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { ChooseVehicleService } from '../service/choose-vehicle.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-choose-vehicle',
  templateUrl: './choose-vehicle.component.html',
  styleUrls: ['./choose-vehicle.component.css']
})
export class ChooseVehicleComponent implements OnInit {
  vehicles!:Vehicle[];

  @Input()vehicle!:Vehicle;

  vehicleObj:Vehicle= new Vehicle();
  constructor(private chooseVehicleService:ChooseVehicleService,private route:ActivatedRoute,private router:Router) { }
  orderId!:any;
  userId!:any;
  orderCost!:any;
  showButtons:any=true;
  noVehicleAvailable:any;
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params=>{
      this.orderId=params.get('orderId');
      this.userId=params.get('userId');
      this.orderCost=params.get('orderCost');
       console.log(this.userId);
       console.log(this.orderId);
       console.log(this.orderCost);
      if(this.orderId ==null) this.showButtons=false;
      });
      if(this.orderId !=null){
        this.showButtons=true;
      }
    this.chooseVehicleService.getVehicles().subscribe(data=>
      {this.vehicles=data
      console.log("data recieved all vehiles: ");
      console.log(this.vehicles);
      if(data==null || this.vehicles.length==0){
       this.noVehicleAvailable=true;
      }
     
      }
      );
  }
  onSelectItem() {
    // this.vehicle.userId=11;
    // this.vehicle.orderId=22;
    this.chooseVehicleService.vehicleSelectedEvent.emit(this.vehicle);
  }
  //method to update vehile with orderID and userID
  onSelect(index:any){
    console.log("index recieved: "+index);
    this.vehicleObj=this.vehicles[index];
    console.log("vehicle obj below after indexing");
    console.log(this.vehicleObj);
    //console.log(userId+" " +orderId+"userId and orderId");
    //this.vehicleObj.userId=this.userId;
    this.vehicleObj.orderId=this.orderId;
    this.vehicleObj.vehicleAvailability=false;
    this.chooseVehicleService.saveVehicle(this.vehicleObj).subscribe(data=>{
      console.log("data after save service call ");
      console.log(data);
      alert("vehicle selected")
      this.goToPaymentVerify(this.userId, this.orderId);
    })
  }
  goToPaymentVerify(userId: any, orderId: any) {
    console.log("user id before passed to pay verify");
    console.log(userId);
    console.log(orderId);
    this.router.navigate(['payment-verify'],{queryParams:{userId,orderId,orderCost:this.orderCost}});
  }
}
