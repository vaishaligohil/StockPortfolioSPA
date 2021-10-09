
export interface IStock {
  stockId: number;
  symbol: string;
  contracts: number;
  buyPrice: number;
  price?: number;
}

export interface IMarketStock {
  vwdKey: string;
  name: string;
  isin: string;
  price: number;
  time: Date;
  open: number;
  high: number;
  low: number;
  close?: any;
  volume: number;
  previousClose: number;
  previousCloseTime: Date;
}


