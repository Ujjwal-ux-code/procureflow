
import { useMemo, useState } from "react";
import {
  Plus, Search, SlidersHorizontal, FileText, Clock3,
  CheckCircle2, XCircle, Eye, X, CalendarDays,
  Package, ArrowUpDown, MoreHorizontal
} from "lucide-react";

const initialRequests = [
  {
    id: "PR-0248",
    title: "MacBook Pro 14-inch",
    category: "Electronics",
    department: "Engineering",
    requester: "Rahul Sharma",
    date: "Nov 14, 2026",
    amount: 189900,
    priority: "High",
    status: "Pending",
    quantity: 2,
    reason: "Required for the development team's new projects."
  },
  {
    id: "PR-0247",
    title: "Office Furniture",
    category: "Furniture",
    department: "Administration",
    requester: "Priya Mehta",
    date: "Nov 13, 2026",
    amount: 45000,
    priority: "Medium",
    status: "Approved",
    quantity: 5,
    reason: "Additional furniture for the new office space."
  },
  {
    id: "PR-0246",
    title: "Wireless Keyboards",
    category: "Accessories",
    department: "Marketing",
    requester: "Aman Verma",
    date: "Nov 12, 2026",
    amount: 12000,
    priority: "Low",
    status: "Rejected",
    quantity: 10,
    reason: "Replacement keyboards for the marketing team."
  },
  {
    id: "PR-0245",
    title: "Cloud Server Subscription",
    category: "Software",
    department: "Engineering",
    requester: "Rohit Singh",
    date: "Nov 11, 2026",
    amount: 65000,
    priority: "High",
    status: "Pending",
    quantity: 1,
    reason: "Additional cloud resources for deployment."
  },
  {
    id: "PR-0244",
    title: "Office Stationery",
    category: "Supplies",
    department: "Finance",
    requester: "Neha Gupta",
    date: "Nov 10, 2026",
    amount: 8500,
    priority: "Low",
    status: "Approved",
    quantity: 20,
    reason: "Monthly stationery replenishment."
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Rejected: "bg-red-50 text-red-600 border-red-100",
};

const priorityStyles = {
  High: "text-red-600",
  Medium: "text-amber-600",
  Low: "text-slate-500",
};

function Requests() {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "Electronics",
    department: "Engineering",
    quantity: 1,
    amount: "",
    priority: "Medium",
    reason: "",
  });

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesFilter =
        filter === "All" || request.status === filter;

      const matchesSearch = [
        request.id,
        request.title,
        request.requester,
        request.department,
      ].some((value) =>
        value.toLowerCase().includes(search.toLowerCase())
      );

      return matchesFilter && matchesSearch;
    });
  }, [requests, filter, search]);

  const stats = [
    {
      label: "Total Requests",
      value: requests.length,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pending",
      value: requests.filter(r => r.status === "Pending").length,
      icon: Clock3,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Approved",
      value: requests.filter(r => r.status === "Approved").length,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Rejected",
      value: requests.filter(r => r.status === "Rejected").length,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      ...form,
      id: `PR-${String(249 + requests.length - 5).padStart(4, "0")}`,
      requester: "You",
      date: new Date().toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      amount: Number(form.amount),
      quantity: Number(form.quantity),
      status: "Pending",
    };

    setRequests(prev => [newRequest, ...prev]);
    setShowForm(false);
    setForm({
      title: "",
      category: "Electronics",
      department: "Engineering",
      quantity: 1,
      amount: "",
      priority: "Medium",
      reason: "",
    });
    setFilter("All");
    setSearch("");
  };

  const updateStatus = (id, status) => {
    setRequests(prev =>
      prev.map(request =>
        request.id === id ? { ...request, status } : request
      )
    );

    setSelectedRequest(null);
  };

  return (
    <div className="space-y-7 text-[#171719]">

      {/* Page Heading */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[2px] text-gray-400">
            WORKSPACE / PROCUREMENT
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Purchase Requests<span className="text-blue-600">.</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Create, manage and track all your purchase requests.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-[#171719] px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={17} />
          New Request
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <div className={`rounded-lg p-2 ${stat.bg}`}>
                  <Icon size={18} className={stat.color} />
                </div>
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Requests Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-5">
          <div>
            <h2 className="font-semibold">All Requests</h2>
            <p className="mt-1 text-xs text-gray-400">
              View and manage purchase requests
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
              <Search size={16} className="text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search requests..."
                className="w-36 bg-transparent text-sm outline-none sm:w-48"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-6 overflow-x-auto border-b border-gray-100 px-5">
          {["All", "Pending", "Approved", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`whitespace-nowrap border-b-2 py-3 text-sm transition ${
                filter === tab
                  ? "border-blue-600 font-semibold text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50/70">
              <tr className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                <th className="px-5 py-4">Request</th>
                <th className="px-5 py-4">Department</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="transition hover:bg-gray-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-gray-100 p-2.5">
                        <Package size={18} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{request.title}</p>
                        <p className="mt-1 text-xs text-gray-400">
                          {request.id} · {request.requester}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {request.department}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {request.date}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium">
                    {formatCurrency(request.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold ${priorityStyles[request.priority]}`}>
                      {request.priority}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[request.status]}`}>
                      {request.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-800"
                      title="View details"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-14 text-center">
                    <FileText size={30} className="mx-auto text-gray-300" />
                    <p className="mt-3 text-sm font-medium text-gray-600">
                      No requests found
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Try changing your search or filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-400">
          Showing {filteredRequests.length} of {requests.length} requests
        </div>
      </div>

      {/* New Request Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-lg font-semibold">Create New Request</h2>
                <p className="mt-1 text-xs text-gray-400">
                  Enter the details of your purchase requirement.
                </p>
              </div>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium">Item / Product Name</label>
                <input
                  required
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  placeholder="e.g. MacBook Pro 14-inch"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    {["Electronics", "Furniture", "Accessories", "Software", "Supplies", "Other"].map(x => <option key={x}>{x}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Department</label>
                  <select
                    value={form.department}
                    onChange={e => setForm({...form, department: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    {["Engineering", "Marketing", "Finance", "Administration", "HR", "Operations"].map(x => <option key={x}>{x}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Quantity</label>
                  <input
                    required
                    min="1"
                    type="number"
                    value={form.quantity}
                    onChange={e => setForm({...form, quantity: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Estimated Amount (₹)</label>
                  <input
                    required
                    min="1"
                    type="number"
                    value={form.amount}
                    onChange={e => setForm({...form, amount: e.target.value})}
                    placeholder="Enter amount"
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium">Priority</label>
                  <select
                    value={form.priority}
                    onChange={e => setForm({...form, priority: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Reason for Request</label>
                <textarea
                  required
                  rows="3"
                  value={form.reason}
                  onChange={e => setForm({...form, reason: e.target.value})}
                  placeholder="Explain why this purchase is needed..."
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#171719] px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 p-6">
              <div>
                <p className="text-xs font-medium text-gray-400">{selectedRequest.id}</p>
                <h2 className="mt-2 text-xl font-semibold">{selectedRequest.title}</h2>
              </div>
              <button onClick={() => setSelectedRequest(null)} className="rounded-lg p-2 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[selectedRequest.status]}`}>
                  {selectedRequest.status}
                </span>
              </div>

              {[
                ["Requester", selectedRequest.requester],
                ["Department", selectedRequest.department],
                ["Category", selectedRequest.category],
                ["Quantity", selectedRequest.quantity],
                ["Estimated Amount", formatCurrency(selectedRequest.amount)],
                ["Priority", selectedRequest.priority],
                ["Date", selectedRequest.date],
                ["Reason", selectedRequest.reason],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-5 border-b border-gray-50 pb-3">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="max-w-[65%] text-right text-sm font-medium">{value}</span>
                </div>
              ))}

              {selectedRequest.status === "Pending" && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => updateStatus(selectedRequest.id, "Rejected")}
                    className="flex-1 rounded-lg border border-red-200 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateStatus(selectedRequest.id, "Approved")}
                    className="flex-1 rounded-lg bg-[#171719] py-3 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Requests;
