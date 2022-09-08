import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { ItemService } from '../service/item.service';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { FullOrderService } from '../service/full-order.service';
import { FullOrder } from '../model/full-order';
import { UserService } from '../service/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-add-goods',
  templateUrl: './add-goods.component.html',
  styleUrls: ['./add-goods.component.css']
})
export class AddGoodsComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }

  // constructor() { }

  // ngOnInit(): void {
  // }
   item:Item= new Item; //user object created
   fullOrder:FullOrder= new FullOrder;
   userId:any;
   orderId:any;
   obj:any;

  name:string="";
  // age!:number;
  // obj!:Object;
  // confirmPass!:String;

  // userAccountLoggedin!:boolean;
  // userAccountLoginStatusMsg!:string;
  constructor(private itemService:ItemService,private router:Router,private fullOrderService:FullOrderService,private route:ActivatedRoute,private userService:UserService){}//angular service injected
id:any;
userObj:User= new User();
  ngOnInit():void{
    this.route.queryParamMap.subscribe(params=>{
      this.id=params.get('id');
      console.log("id recieved inside onInit add goods")
      console.log(this.id);
      if(this.id==null)this.id=localStorage.getItem("id");
      });
      //user servic called
      this.userService.getUser(this.id).subscribe(data=>{
        console.log("user recieved after get user after home");
        console.log(data);
        this.userObj=data;
        // this.email=data.email;
        // this.fName=data.fName;
        // this.name=data.firstName+" "+data.lastName;
        // console.log(this.name);
        // this.role=data.role;
       });
   
  }
// angular service get one item method called
  private getItem(){
   this.itemService.getItem(1).subscribe(
    data=>{
      this.obj=data;
      console.log("inside getUser");
      // console.log(data);
      console.log(this.obj);
    }
   )
  }
  //angular service create item using item service createitem method 

  

  handleName(event:Event){
    console.log("inside name handeler funtion");
    console.log((<HTMLInputElement>event.target).value);
    this.name=(<HTMLInputElement>event.target).value;
    console.log(this.name);
   

    //console.log(event);
  }
  
  onSubmit(submit:any){
    console.log("form submited");
    console.log(this.item);
    console.log(submit);
    this.fullOrder.item=this.item;
    this.fullOrder.user=this.userObj;
    console.log(this.fullOrder);
    console.log("full order object above");
    this.fullOrderService.addFullOrder(this.fullOrder).subscribe(data=>{
      console.log("below data recieved from backend");
      if(data==null) {
        console.log("not recieved data after creation");
      }
      else{
        console.log(data);
        this.obj=data;
        // console.log('obj');
        console.log(this.obj);
        console.log("order id")
        console.log(this.obj.itemId);
        this.orderId=this.obj.itemId;
        console.log(" above item data recived after creation");
        this.userId = this.fullOrder.user.id;
        console.log("Inside OnSubmit");
        console.log(this.userId);
        console.log(this.orderId);
        this.goToVehicle(this.userId,this.orderId);
      }
     })
     
     //create item called within this class
  }
  goToVehicle(userId: any, orderId: any) {
    console.log("user id before passed to route order");
    console.log(userId);
    console.log(orderId);
    this.router.navigate(['vehicle'],{queryParams:{userId,orderId}});
  }
  onSelected(event:Event){
    console.log("inside onslected ");
    console.log(event);
    console.log((<HTMLInputElement>event.target).value);
  }

}
