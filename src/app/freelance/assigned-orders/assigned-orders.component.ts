import { Component, OnInit } from '@angular/core';

import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-assigned-orders',
  templateUrl: './assigned-orders.component.html',
  styleUrls: ['./assigned-orders.component.scss']
})
export class AssignedOrdersComponent implements OnInit {

  orders: Order[]
  
  constructor(private orderService: OrderService){

  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getAssignedOrders().subscribe(
      orders => {this.orders = orders}
    )
  }
  
}
