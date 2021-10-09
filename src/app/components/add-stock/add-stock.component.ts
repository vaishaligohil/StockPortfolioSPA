import { IStock } from './../stock';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';
import sampleData from '../../RawData/stocks.json';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  @Output() AddedStock: EventEmitter<any> = new EventEmitter<any>();

  checkoutForm = this.formBuilder.group({
    symbol: '',
    contracts: '',
    buyPrice: ''
  });

  Stocks: any = sampleData;

  constructor(private stockService: StockService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
  }


  // Add new stock to the portfolio
  onSubmit(): void {
    const request = {
      contracts: Number(this.checkoutForm.value.contracts),
      buyPrice: Number(this.checkoutForm.value.buyPrice),
      symbol: this.checkoutForm.value.symbol,
    } as IStock;

    this.stockService.create(request)
      .subscribe(
        response => {
          this.AddedStock.emit(response);
        },
        error => {
          console.log(error);
        });
    this.checkoutForm.reset();
  }
}
