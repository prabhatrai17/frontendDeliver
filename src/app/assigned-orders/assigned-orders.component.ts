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
      
      this.vehicleService.getVehicleByUserId(this.id).subscribe(data=>{
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
   
      this.status1=this.assignedOrderObjArr[0].deliveryStatus;
      this.status2=this.assignedOrderObjArr[1].deliveryStatus;
      console.log("final fetched arr of orders : ");
      console.log(this.assignedOrderObjArr);
      })
    
       this.sampleOrderStatus= [
        {orderStatus: "pickup order"},
        {orderStatus: "dispatch order"},
        {orderStatus: "arriving order"},
        {orderStatus: "Order Delivered"}
      ];

    
  }
  statusSelected(value:any,orderId:any){
    console.log(value);
    console.log("orderId"+orderId);
    this.orderId=orderId;
    
    if(value==="pickup order")
    this.fullOrder.pickupStatus='true';
    if(value=="arriving order")
    this.fullOrder.arrivingStatus='true';
    if(value=="dispatch order")
    this.fullOrder.dispatchStatus='true';
    if(value=="Order Delivered")
    this.fullOrder.deliveryStatus='true';
    
    console.log(this.fullOrder);
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
      //this.router.navigate(['assigned-orders']);
  }
    onClick():any{
      this.orderService.updateOrderStatus(this.fullOrder,this.orderId).subscribe(data=>{
        console.log(data);
        // this.changeDetectorRefs.detectChanges();
        this.reloadCurrentRoute();
      })
    }

}
