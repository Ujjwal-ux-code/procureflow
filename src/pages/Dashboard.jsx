
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock3,
  ShoppingCart,
  Users,
  FileText,
  Plus,
  ArrowRight,
  MoreHorizontal,
  CheckCircle2,
} from 'lucide-react'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const stats = [
  {
    title: 'Total requests',
    value: '248',
    change: '+12.5%',
    description: 'vs. last month',
    icon: FileText,
    positive: true,
  },
  {
    title: 'Pending approvals',
    value: '18',
    change: 'Needs attention',
    description: 'Awaiting review',
    icon: Clock3,
    positive: null,
  },
  {
    title: 'Active orders',
    value: '42',
    change: '+8',
    description: 'vs. last month',
    icon: ShoppingCart,
    positive: true,
  },
  {
    title: 'Total suppliers',
    value: '36',
    change: '+3',
    description: 'New this month',
    icon: Users,
    positive: true,
  },
]

const spendingData = [
  { month: 'Jan', spending: 42000 },
  { month: 'Feb', spending: 56000 },
  { month: 'Mar', spending: 48000 },
  { month: 'Apr', spending: 72000 },
  { month: 'May', spending: 65000 },
  { month: 'Jun', spending: 85000 },
  { month: 'Jul', spending: 78000 },
  { month: 'Aug', spending: 92000 },
  { month: 'Sep', spending: 82000 },
  { month: 'Oct', spending: 105000 },
  { month: 'Nov', spending: 96000 },
  { month: 'Dec', spending: 118000 },
]

const requests = [
  {
    id: 'PR-0248',
    name: 'MacBook Pro 14-inch',
    department: 'Engineering',
    date: '14 Nov 2026',
    amount: '₹1,85,000',
    status: 'Pending',
  },
  {
    id: 'PR-0247',
    name: 'Office furniture',
    department: 'Administration',
    date: '13 Nov 2026',
    amount: '₹42,500',
    status: 'Approved',
  },
  {
    id: 'PR-0246',
    name: 'Wireless keyboards',
    department: 'IT Department',
    date: '12 Nov 2026',
    amount: '₹18,000',
    status: 'Processing',
  },
  {
    id: 'PR-0245',
    name: 'Printer supplies',
    department: 'Operations',
    date: '11 Nov 2026',
    amount: '₹8,500',
    status: 'Pending',
  },
]

const activities = [
  {
    title: 'Purchase request submitted',
    detail: 'MacBook Pro 14-inch · PR-0248',
    time: '10 minutes ago',
    icon: FileText,
  },
  {
    title: 'Purchase order approved',
    detail: 'Office furniture · PO-0124',
    time: '1 hour ago',
    icon: CheckCircle2,
  },
  {
    title: 'New supplier added',
    detail: 'Tech Solutions Pvt. Ltd.',
    time: '3 hours ago',
    icon: Users,
  },
]

function StatusBadge({ status }) {
  const styles = {
    Pending: 'bg-amber-50 text-amber-700',
    Approved: 'bg-emerald-50 text-emerald-700',
    Processing: 'bg-blue-50 text-blue-700',
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  )
}

function Dashboard() {
  return (
    <div className="space-y-9">

      {/* Heading */}
      <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-zinc-400 font-medium mb-3">
            Saturday, November 14, 2026
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
            Overview<span className="text-blue-600">.</span>
          </h1>

          <p className="text-sm text-zinc-500 mt-2">
            Here's what's happening with your procurement today.
          </p>
        </div>

       
      </section>

      {/* Statistics */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className="bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-500">{stat.title}</p>
                  <Icon size={18} className="text-zinc-400" strokeWidth={1.7} />
                </div>

                <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 mt-5">
                  {stat.value}
                </h2>

                <div className="flex items-center gap-1.5 mt-3">
                  {stat.positive === true && (
                    <ArrowUpRight size={14} className="text-emerald-600" />
                  )}

                  <span className={`text-xs font-medium ${
                    stat.positive === true
                      ? 'text-emerald-600'
                      : 'text-zinc-600'
                  }`}>
                    {stat.change}
                  </span>

                  <span className="text-xs text-zinc-400">
                    {stat.description}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Spending and activity */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Spending chart */}
        <div className="xl:col-span-2 bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-zinc-900">
                Procurement spending
              </p>

              <h2 className="text-3xl font-semibold tracking-tight mt-3 text-zinc-900">
                ₹8,42,500
              </h2>

              <p className="text-xs text-zinc-400 mt-1">
                Total spending overview
              </p>
            </div>

            <button className="text-zinc-400 hover:text-zinc-900">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="h-[260px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#315EFB" stopOpacity={0.16} />
                    <stop offset="95%" stopColor="#315EFB" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F0F0F0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A1A1AA', fontSize: 11 }}
                  dy={10}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A1A1AA', fontSize: 11 }}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                  width={50}
                />

                <Tooltip
                  formatter={(value) => [
                    `₹${Number(value).toLocaleString('en-IN')}`,
                    'Spending',
                  ]}
                  contentStyle={{
                    borderRadius: '10px',
                    border: '1px solid #E4E4E7',
                    fontSize: '12px',
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="spending"
                  stroke="#315EFB"
                  strokeWidth={2}
                  fill="url(#spendingGradient)"
                  activeDot={{ r: 5, fill: '#315EFB' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-7">
            <h3 className="text-sm font-semibold text-zinc-900">
              Recent activity
            </h3>

            <button className="text-zinc-400 hover:text-zinc-900">
              <MoreHorizontal size={19} />
            </button>
          </div>

          <div className="space-y-7">
            {activities.map((activity, index) => {
              const Icon = activity.icon

              return (
                <div key={index} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-zinc-500" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-800">
                      {activity.title}
                    </p>

                    <p className="text-xs text-zinc-400 mt-1">
                      {activity.detail}
                    </p>

                    <p className="text-[11px] text-zinc-400 mt-2">
                      {activity.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <button className="flex items-center gap-2 text-xs font-medium text-zinc-600 hover:text-blue-600 mt-8 transition-colors">
            View all activity
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Purchase requests table */}
      <section className="bg-white border border-zinc-200 rounded-xl overflow-hidden">

        <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-zinc-900">
              Recent purchase requests
            </h3>

            <p className="text-xs text-zinc-400 mt-1">
              A summary of your latest procurement requests.
            </p>
          </div>

          <button className="text-xs font-medium text-zinc-600 hover:text-blue-600 flex items-center gap-2">
            View all requests
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-zinc-50/70 border-y border-zinc-100">
              <tr>
                {['Request', 'Department', 'Date', 'Amount', 'Status'].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 text-[11px] uppercase tracking-wider font-medium text-zinc-400"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/70 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-zinc-800">
                      {request.name}
                    </p>

                    <p className="text-xs text-zinc-400 mt-1">
                      {request.id}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {request.department}
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {request.date}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-zinc-800">
                    {request.amount}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={request.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between">
          <p className="text-xs text-zinc-400">
            Showing 4 of 248 requests
          </p>

          <button className="text-xs font-medium text-zinc-600 hover:text-blue-600 flex items-center gap-1">
            See all <ArrowRight size={13} />
          </button>
        </div>

      </section>

    </div>
  )
}

export default Dashboard
