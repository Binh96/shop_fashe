import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { render } from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnChanges {
  
  @Input() totalPrice;
  oldPrice: number;

  constructor() 
  {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    this.payment();
  }

  payment(){
    render({
      id: "#myPaypalButton",
      currency: "USD",
      value: ''+this.totalPrice,
      onApprove: (details) => {
        alert("Transaction successfully!");
      }
    });
  }

}
