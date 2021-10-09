import { AddStockComponent } from './components/add-stock/add-stock.component';
import { NgModule } from '@angular/core';
import { StockComponent } from './components/stock/stock.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
