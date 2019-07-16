import { Component, OnInit } from '@angular/core';

import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-created-orders',
  templateUrl: './created-orders.component.html',
  styleUrls: ['./created-orders.component.scss']
})
export class CreatedOrdersComponent implements OnInit {

  orders: Order[]
  
  constructor(private orderService: OrderService){

  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getCreatedOrders().subscribe(
      orders => {this.orders = orders}
    )
  }
  
}
