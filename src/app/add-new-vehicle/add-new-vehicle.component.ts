import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../service/vehicle.service';

@Component({
  selector: 'app-add-new-vehicle',
  templateUrl: './add-new-vehicle.component.html',
  styleUrls: ['./add-new-vehicle.component.css']
})
export class AddNewVehicleComponent implements OnInit {
userId:any;
  data = {
    model:"",
    vehicleNumber:"",
    vehicleType:"",
    imgURL: "",
    revenueGenerated: 0,
    vehicleAvailability: true,
    userId:0,
    orderId:0,
    userDlNumber:""
  }

  constructor(private snack:MatSnackBar, private BackendService:BackendService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params=>{
      this.userId=params.get('userId');
      console.log(this.userId);

      if(this.userId==null)this.userId=localStorage.getItem("userId");
      this.data.userId=this.userId;
      });
    
  }
  
  btnClick()
  {
    console.log("btn clicked");
    this.snack.open("Vehicle added successfully","Discard")
  }

  goToLogin(){
    localStorage.clear;
    this.router.navigateByUrl('/login');
  }

  formSubmit(){
    console.log("add vehicle button pressed")
    console.log(this.data)

    if(this.data.model=='' || this.data.vehicleNumber=='' || this.data.vehicleType=='' || this.data.userDlNumber=='') {
      this.snack.open("Field(s) can not be empty", "Discard");
      return;
    }
    

    this.BackendService.saveVehicle(this.data).subscribe(
      response=>{
        console.log(response);
        this.goToLogin();
      },
      error=>{
        console.log(error);
      }
    )
    
  }
}
