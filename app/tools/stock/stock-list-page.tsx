"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@trycreo/ui/card";
import StockTable from './stock-table';

export default function StockListPage() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Top 100 Stocks by Change Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <StockTable />
        </CardContent>
      </Card>
    </div>
  );
}