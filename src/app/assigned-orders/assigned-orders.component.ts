import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FullOrder } from '../model/full-order';
import { FullOrderService } from '../service/full-order.service';
import { BackendService } from '../service/vehicle.service';
import { ChangeDetectorRef } from '@angular/core';
import { Vehicle } from '../model/vehicle';

// interface SampleOrderStatus {"4"
//   orderStatus: String;
// }

@Component({
  selector: 'app-assigned-orders',
  templateUrl: './assigned-orders.component.html',
  styleUrls: ['./assigned-orders.component.css']
})
export class AssignedOrdersComponent implements OnInit {

 
  
  // orderStatus = <any>{shareOptions:['pickup_status','arriving_status','dispatch_status','delivery_status']};
    
  fullOrder:FullOrder= new FullOrder();
   
    selected:any;
    // this.fullOrder.arrivingStatus='false';
    
    // this.fullOrder.dispatchStatus='false';
    
    // this.fullOrder.deliveryStatus='false';
  sampleOrderStatus:any[]=[];

  allOrderArr:any[]=[];
  driverOrderArr:any[]=[];
  assignedOrderObjArr:any[]=[];
  orderId:any;
  status!:any;
  status1!:boolean;
  status2!:boolean;
  dirverEmail:any;
  revenue:any;
  vehicle:any;
  selectedValue:any;
  days:any;
  constructor(private route:ActivatedRoute,private router:Router,private vehicleService:BackendService,private orderService:FullOrderService,private changeDetectorRefs: ChangeDetectorRef) { }
  id:any;
  i:any;
  j:any;
  ngOnInit(): void {
   
    this.route.queryParamMap.subscribe(params=>{
      this.id=params.get('id');
      console.log(this.id);
      if(this.id==null)this.id=localStorage.getItem("id");
      });
      
      
      this.vehicleService.getVehicleByDriverUserId(this.id).subscribe(data=>{
        console.log("vehicle got");
        console.log(data);
        this.vehicle=data;
        this.revenue=this.vehicle.revenueGenerated;
        console.log(this.revenue);
       })



      //=------------------------------------------------------------------------
      this.vehicleService.getDriverAssignedOrders(this.id).subscribe(data=>{
        console.log("data recieved afte getassigned order called");
        console.log(data);
        this.driverOrderArr=data;
      })

      this.orderService.getAllOrders().subscribe(data=>{
        console.log("data recieved all order called");
        console.log(data);
        this.allOrderArr=data;
       
        for( this.i=0;this.i<this.allOrderArr.length;this.i++){
            console.log(this.allOrderArr[this.i].orderId);
            for( this.j=0;this.j<this.driverOrderArr.length;this.j++){
                  if(this.allOrderArr[this.i].orderId==this.driverOrderArr[this.j]){
                         this.assignedOrderObjArr.push(this.allOrderArr[this.i]);
                         
                  }
        }
      }
      this.dirverEmail=this.assignedOrderObjArr[0].user.email;
      console.log(this.dirverEmail);
      // console.log(this.assignedOrderObjArr[0]);
      // this.status1=this.assignedOrderObjArr[0].deliveryStatus;
      // this.status2=this.assignedOrderObjArr[1].deliveryStatus;
      console.log("final fetched arr of orders : ");
      // this.fullOrder=this.assignedOrderObjArr[0];
      this.fullOrder.arrivingStatus=this.assignedOrderObjArr[0].arrivingStatus;
      this.fullOrder.deliveryStatus=this.assignedOrderObjArr[0].deliveryStatus;
      this.fullOrder.dispatchStatus=this.assignedOrderObjArr[0].dispatchStatus;
      this.fullOrder.dropAddress=this.assignedOrderObjArr[0].dropAddress;
      this.fullOrder.pickupAddress=this.assignedOrderObjArr[0].pickupAddress;
      this.fullOrder.estCost=this.assignedOrderObjArr[0].estCost;
      this.fullOrder.estDistance=this.assignedOrderObjArr[0].estDistance;
      this.fullOrder.orderCompleted=this.assignedOrderObjArr[0].orderCompleted;
      this.fullOrder.orderDate=this.assignedOrderObjArr[0].orderDate;
      this.fullOrder.paymentStatus=this.assignedOrderObjArr[0].paymentStatus;
      
      
      console.log(this.assignedOrderObjArr);
      console.log(this.fullOrder);
      })
    
       this.sampleOrderStatus= [
        {orderStatus: "pickup order"},
        {orderStatus: "dispatch order"},
        {orderStatus: "arriving order"},
        {orderStatus: "Order Delivered"}
      ];

    
  }
  totalRev():void{
     this.vehicleService.getVehicleRevenueByDriverUserId(this.id).subscribe(data=>{
      console.log("revenue received");
      console.log(data);
      this.revenue=data;
     })
     this.reloadCurrentRoute();
  }
  statusSelected(value:any,orderId:any){
    console.log(value);
    console.log("orderId"+orderId);
    this.orderId=orderId;
    this.selectedValue=value;
    console.log("status selected below fOrder obj");
    console.log(this.fullOrder);
    
    // if(value==="pickup order")
    // this.fullOrder.pickupStatus='true';
    // if(value=="arriving order")
    // this.fullOrder.arrivingStatus='true';
    // if(value=="dispatch order")
    // this.fullOrder.dispatchStatus='true';
    // if(value=="Order Delivered")
    // this.fullOrder.deliveryStatus='true';
    
    
    }
    logout(){
      localStorage.clear;
      this.router.navigate(['login']);
    }
    reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
          this.router.navigate(['assigned-orders']);
      });
     // this.router.navigate(['assigned-orders']);
  }
    onClick(orderId:any):any{
      if(this.selectedValue==="pickup order")
    this.fullOrder.pickupStatus='true';
    if(this.selectedValue=="arriving order")
    this.fullOrder.arrivingStatus='true';
    if(this.selectedValue=="dispatch order")
    this.fullOrder.dispatchStatus='true';
    if(this.selectedValue=="Order Delivered")
    this.fullOrder.deliveryStatus='true';
    console.log("fOrder before passed to backend");
    

    console.log(this.fullOrder);
      this.orderService.updateOrderStatus(this.fullOrder,this.orderId).subscribe(data=>{
        console.log(data);
        // this.changeDetectorRefs.detectChanges();
        //this.reloadCurrentRoute();
      })
      this.orderService.getDriverRevenueByDriverUserId(this.id).subscribe(data=>{
        console.log("data after total rev called");
        console.log(data);
        this.revenue=data;
      })
      this.reloadCurrentRoute();
    }
    getRevenueByDays(event:any):void{
     console.log(event.target.value);
     this.days=event.target.value;
     this.orderService.getDriverRevenueByDays(this.id,this.days).subscribe(data=>{
      console.log("data after days rev call");
      console.log(data);
      this.revenue=data;
      this.reloadCurrentRoute();
     })
    }

}
