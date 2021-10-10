import { MarketStockService } from './../../services/market.stock.service';
import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { IStock } from '../stock';
import { Observable, Subscription, timer } from 'rxjs';
import sampleData from '../../RawData/marketPrice.json';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  marketStock: any = sampleData;

  stocks: IStock[];

  subscription: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 5000);

  constructor(private stockService: StockService, private marketStockService: MarketStockService) { }

  ngOnInit(): void {

    // Get all existing stocks of the portfolio
    this.getAllStock();

    // Update data after every 5 second
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.getMarketPrice();
    });
  }

  // Get all existing stocks of the portfolio
  getAllStock() {
    this.stockService.getStock().subscribe(
      (data) => {
        this.stocks = data;
        this.getMarketPrice();
      }, (error) => {
        console.log(error)
      });
  }

  // Read real time market price for the stocks in the portfolio
  getMarkteStock() {
    var data = '?vwdkey=' + this.stocks.map((x) => x.symbol).join('&vwdkey=');

    this.marketStockService.getMarketStock(data).subscribe(
      (res) => {
        this.marketStock = res;

        if (this.stocks != undefined) {
          this.stocks = this.stocks.map(item => {
            const obj = this.marketStock.find(o => o.vwdKey === item.symbol);
            return { ...item, ...obj };
          });
        }
      }, (error) => {
        console.log(error)
      })
  }

  // Get the percentage diff for the yeild field
  getPercent(a, b) {
    var result = 0;
    result = ((b - a) * 100) / a;
    return result;
  }

  // Read market stock price
  getMarketPrice() {
    if (this.stocks == undefined) return;
    this.stocks = this.stocks.map(item => {
      const obj = this.marketStock.find(o => o.vwdKey === item.symbol);
      return { ...item, ...obj };
    });
  }

  // Delete stock from the portfolio
  deleteStock(stockId: number, i: number) {
    this.stockService.delete(stockId).subscribe((res) => {
      if (res)
        this.stocks.splice(i, 1);
    });
  }

  // Update portfolio after new stock is added
  handleNewStock(stock: IStock) {
    // Maintain a single position when the same symbol is added multiple times
    if (this.stocks.find((s) => s.stockId == stock.stockId) != undefined) {
      var index = this.stocks.findIndex((s) => s.stockId == stock.stockId);
      this.stocks[index] = stock;
    }
    else
      this.stocks.push(stock);
    this.getMarketPrice();
  }

  buyStock() {

  }

  sellStock() { }

  /// Footer total columns
  totalBuyPrice() {
    return this.stocks.reduce((accum, curr) => accum + curr.buyPrice, 0);
  }

  totalMarketPrice() {
    return this.stocks.reduce((accum, curr) => accum + (curr.price * curr.contracts), 0);
  }

  totalPercentage() {
    return this.stocks.reduce((accum, curr) => accum + this.getPercent(curr.price * curr.contracts, curr.buyPrice), 0);
  }
  // end footer


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
