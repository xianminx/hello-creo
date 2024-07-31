import { NextResponse } from 'next/server';

export const revalidate = 0;

// Mock data for demonstration purposes
const stocksData = [
  { id: 1, name: 'AAPL', price: 150.25, changeRate: 2.5 },
  { id: 2, name: 'GOOGL', price: 2750.80, changeRate: -1.2 },
  { id: 3, name: 'MSFT', price: 305.50, changeRate: 0.8 },
  { id: 4, name: 'AMZN', price: 3380.00, changeRate: 1.5 },
  { id: 5, name: 'FB', price: 330.75, changeRate: -0.5 },
];

interface Stock {
  id: number;
  name: string;
  price: number;
  changeRate: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const name = searchParams.get('name');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minChangeRate = searchParams.get('minChangeRate');
  const maxChangeRate = searchParams.get('maxChangeRate');

  let filteredStocks: Stock[] = stocksData;

  if (name) {
    filteredStocks = filteredStocks.filter(stock => 
      stock.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (minPrice) {
    filteredStocks = filteredStocks.filter(stock => 
      stock.price >= parseFloat(minPrice)
    );
  }

  if (maxPrice) {
    filteredStocks = filteredStocks.filter(stock => 
      stock.price <= parseFloat(maxPrice)
    );
  }

  if (minChangeRate) {
    filteredStocks = filteredStocks.filter(stock => 
      stock.changeRate >= parseFloat(minChangeRate)
    );
  }

  if (maxChangeRate) {
    filteredStocks = filteredStocks.filter(stock => 
      stock.changeRate <= parseFloat(maxChangeRate)
    );
  }

  return NextResponse.json(filteredStocks);
}