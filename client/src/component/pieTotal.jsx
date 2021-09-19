import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "c:/",
    pv: 10,
  },
  {
    name: "d:/",
    pv: 20,
  },
  {
    name: "e:/",
    pv: 34,
  },
  {
    name: "//198.125.12.11",
    pv: 40,
  },
  {
    name: "Page E",
    pv: 30,
  },
  {
    name: "Page F",
    pv: 20,
  },
  {
    name: "Page G",
    pv: 110,
  },
];

function PieTotal() {
  return (
    <ResponsiveContainer width="50%" height="50%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />

        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PieTotal;
