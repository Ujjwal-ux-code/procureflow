
import { useMemo, useState } from "react";
import {
  Download,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  ShoppingCart,
  Package,
  Users,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  FileBarChart,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const monthlyData = [
  { month: "Dec", spending: 245000, orders: 18 },
  { month: "Jan", spending: 310000, orders: 22 },
  { month: "Feb", spending: 285000, orders: 19 },
  { month: "Mar", spending: 390000, orders: 27 },
  { month: "Apr", spending: 345000, orders: 24 },
  { month: "May", spending: 420000, orders: 31 },
  { month: "Jun", spending: 375000, orders: 26 },
  { month: "Jul", spending: 460000, orders: 34 },
  { month: "Aug", spending: 410000, orders: 29 },
  { month: "Sep", spending: 495000, orders: 37 },
  { month: "Oct", spending: 455000, orders: 32 },
  { month: "Nov", spending: 520000, orders: 40 },
];

const departmentData = [
  { department: "Engineering", spending: 420000 },
  { department: "Marketing", spending: 285000 },
  { department: "Operations", spending: 240000 },
  { department: "HR", spending: 165000 },
  { department: "Finance", spending: 120000 },
];

const orderStatusData = [
  { name: "Delivered", value: 48, color: "#16a34a" },
  { name: "Processing", value: 18, color: "#3b82f6" },
  { name: "Pending", value: 14, color: "#f59e0b" },
  { name: "Cancelled", value: 8, color: "#ef4444" },
];

const supplierData = [
  { name: "TechNova Solutions", orders: 24, rating: 4.8, spending: 285000 },
  { name: "Office Essentials Co.", orders: 18, rating: 4.6, spending: 174000 },
  { name: "CloudSphere Technologies", orders: 15, rating: 4.5, spending: 142000 },
  { name: "PrimeTech Distributors", orders: 12, rating: 4.3, spending: 98000 },
];

const inventoryData = [
  { name: "Healthy Stock", value: 68, color: "#16a34a" },
  { name: "Low Stock", value: 22, color: "#f59e0b" },
  { name: "Out of Stock", value: 10, color: "#ef4444" },
];

const currency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const compactCurrency = (value) => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
};

function StatCard({ title, value, change, positive, icon: Icon, subtitle }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold text-gray-900">{value}</h3>
        </div>
        <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {change}
        </span>
        <span className="text-xs text-gray-400">{subtitle}</span>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 ${className}`}>
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

export default function Reports() {
  const [period, setPeriod] = useState("6");

  const filteredMonthlyData = useMemo(() => {
    return monthlyData.slice(-Number(period));
  }, [period]);

  const totalSpending = filteredMonthlyData.reduce(
    (sum, item) => sum + item.spending,
    0
  );

  const totalOrders = filteredMonthlyData.reduce(
    (sum, item) => sum + item.orders,
    0
  );

  const averageOrderValue = totalOrders
    ? totalSpending / totalOrders
    : 0;

  const exportCSV = () => {
    const headers = ["Month", "Total Spending (INR)", "Purchase Orders"];

    const rows = filteredMonthlyData.map((item) => [
      item.month,
      item.spending,
      item.orders,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "procureflow-spending-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <FileBarChart size={22} className="text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-900">
              Reports & Analytics
            </h1>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Track procurement spending and business performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
            <CalendarDays size={16} className="text-gray-500" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-transparent text-sm text-gray-700 outline-none"
            >
              <option value="3">Last 3 months</option>
              <option value="6">Last 6 months</option>
              <option value="12">Last 12 months</option>
            </select>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Spending"
          value={compactCurrency(totalSpending)}
          change="+12.8%"
          positive={false}
          icon={IndianRupee}
          subtitle="vs previous period"
        />

        <StatCard
          title="Purchase Orders"
          value={totalOrders}
          change="+8.2%"
          positive={true}
          icon={ShoppingCart}
          subtitle="vs previous period"
        />

        <StatCard
          title="Average Order Value"
          value={compactCurrency(averageOrderValue)}
          change="+4.3%"
          positive={true}
          icon={TrendingUp}
          subtitle="vs previous period"
        />

        <StatCard
          title="Active Suppliers"
          value="24"
          change="+2"
          positive={true}
          icon={Users}
          subtitle="this month"
        />
      </div>

      {/* Spending Trend */}
      <ChartCard
        title="Spending Overview"
        subtitle="Monthly procurement expenditure"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {currency(totalSpending)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Total spending in selected period
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            Procurement spending
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredMonthlyData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <YAxis
                tickFormatter={compactCurrency}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                width={65}
              />
              <Tooltip
                formatter={(value) => [currency(value), "Spending"]}
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="spending"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#spendingGradient)"
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Department + PO Status */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <ChartCard
          title="Department-wise Spending"
          subtitle="Procurement expenditure by department"
          className="xl:col-span-2"
        >
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentData}
                layout="vertical"
                margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis
                  type="number"
                  tickFormatter={compactCurrency}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="department"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  width={90}
                />
                <Tooltip
                  formatter={(value) => [currency(value), "Spending"]}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="spending"
                  fill="#3b82f6"
                  radius={[0, 5, 5, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Purchase Order Status"
          subtitle="Distribution of purchase orders"
        >
          <div className="relative h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={82}
                  paddingAngle={3}
                  stroke="none"
                >
                  {orderStatusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold text-gray-900">88</span>
              <span className="text-xs text-gray-500">Total orders</span>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {orderStatusData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Supplier Performance */}
      <ChartCard
        title="Supplier Performance"
        subtitle="Overview of your top-performing suppliers"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="pb-3 font-medium">Supplier</th>
                <th className="pb-3 font-medium">Orders</th>
                <th className="pb-3 font-medium">Rating</th>
                <th className="pb-3 text-right font-medium">Total Business</th>
              </tr>
            </thead>
            <tbody>
              {supplierData.map((supplier) => (
                <tr
                  key={supplier.name}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="py-4">
                    <p className="font-medium text-gray-800">{supplier.name}</p>
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    {supplier.orders}
                  </td>
                  <td className="py-4">
                    <span className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                      ★ {supplier.rating}
                    </span>
                  </td>
                  <td className="py-4 text-right text-sm font-medium text-gray-800">
                    {currency(supplier.spending)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* Inventory Health */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard
          title="Inventory Health"
          subtitle="Current stock distribution across products"
        >
          <div className="space-y-5">
            {inventoryData.map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {item.value}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-5">
            <h3 className="font-semibold text-gray-900">Inventory Summary</h3>
            <p className="mt-1 text-xs text-gray-500">
              Quick overview of inventory value and availability
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <Package size={19} className="text-blue-600" />
              <p className="mt-3 text-xl font-semibold text-gray-900">156</p>
              <p className="mt-1 text-xs text-gray-500">Total products</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <IndianRupee size={19} className="text-blue-600" />
              <p className="mt-3 text-xl font-semibold text-gray-900">₹8.4L</p>
              <p className="mt-1 text-xs text-gray-500">Inventory value</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <ArrowUpRight size={19} className="text-green-600" />
              <p className="mt-3 text-xl font-semibold text-gray-900">106</p>
              <p className="mt-1 text-xs text-gray-500">Healthy products</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <ArrowDownRight size={19} className="text-amber-600" />
              <p className="mt-3 text-xl font-semibold text-gray-900">50</p>
              <p className="mt-1 text-xs text-gray-500">Need attention</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">
        Reports are currently based on sample data for demonstration.
      </p>
    </div>
  );
}
