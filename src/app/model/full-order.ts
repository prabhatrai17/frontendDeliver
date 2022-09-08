import { Item } from "./item";
import { User } from "./user";

export class FullOrder {

    user!:User;
    item!:Item;
<<<<<<< HEAD
    // pickupAddress!:String;
    // dropAddress!:String;
=======
    
    //   pickupAddress!:String;
    //   dropAddress!:String;
    //   estDistance!:number;
    //   estCost!:number;
     paymentStatus!:String ;
>>>>>>> 6849280... reverting to second commit attempt
    arrivingStatus:String="false";
    dispatchStatus:String="false";
    pickupStatus:String="false";
    deliveryStatus:String="false";
}
