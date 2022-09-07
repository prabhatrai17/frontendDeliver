import { Item } from "./item";
import { User } from "./user";

export class FullOrder {

    user!:User;
    item!:Item;
    orderCompleted:any;
    orderDate: any;
    pickupAddress!:String;
    dropAddress!:String;
    estDistance!:number;
    estCost!:number;
    arrivingStatus:String="false";
    dispatchStatus:String="false";
    pickupStatus:String="false";
    deliveryStatus:String="false";
    paymentStatus:String="false";
}
