"use client";

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import DataTable from "@trycreo/ui/data-table";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Stock {
  id: number;
  name: string;
  price: number;
  changeRate: number;
}

export default function StockTable() {
  const [sortedStocks, setSortedStocks] = useState<Stock[]>([]);
  const { data: stocks, error } = useSWR<Stock[]>('/tools/stock/api/stocks/', fetcher);

  useEffect(() => {
    if (stocks) {
      const sorted = [...stocks].sort((a, b) => b.changeRate - a.changeRate);
      setSortedStocks(sorted.slice(0, 100));
    }
  }, [stocks]);

  if (error) return <div>Failed to load</div>;
  if (!stocks) return <div>Loading...</div>;

  const columns = [
    {
      accessorKey: "name",
      header: "Stock",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }: { row: { original: Stock } }) => `$${row.original.price.toFixed(2)}`,
    },
    {
      accessorKey: "changeRate",
      header: "Change Rate",
      cell: ({ row }: { row: { original: Stock } }) => `${row.original.changeRate.toFixed(2)}%`,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={sortedStocks}
      pageSize={100}
      isSearchable={true}
    />
  );
}