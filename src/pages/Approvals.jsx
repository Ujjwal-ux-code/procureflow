
import { useMemo, useState } from "react";
import {
  Search,
  Clock3,
  CheckCircle2,
  XCircle,
  ClipboardCheck,
  Eye,
  X,
  CalendarDays,
  Package,
  User,
  Building2,
  IndianRupee,
  MessageSquareText,
  Filter,
  ArrowUpRight,
} from "lucide-react";

const initialApprovals = [
  {
    id: "PR-0248",
    title: "MacBook Pro 14-inch",
    requester: "Rahul Sharma",
    department: "Engineering",
    category: "Electronics",
    quantity: 2,
    amount: 189900,
    date: "Nov 14, 2026",
    priority: "High",
    status: "Pending",
    reason: "Required for the development team's new projects and improved productivity.",
  },
  {
    id: "PR-0245",
    title: "Cloud Server Subscription",
    requester: "Rohit Singh",
    department: "Engineering",
    category: "Software",
    quantity: 1,
    amount: 65000,
    date: "Nov 11, 2026",
    priority: "High",
    status: "Pending",
    reason: "Additional cloud resources are required for upcoming deployments.",
  },
  {
    id: "PR-0247",
    title: "Office Furniture",
    requester: "Priya Mehta",
    department: "Administration",
    category: "Furniture",
    quantity: 5,
    amount: 45000,
    date: "Nov 13, 2026",
    priority: "Medium",
    status: "Approved",
    reason: "Additional furniture for the new office space.",
  },
  {
    id: "PR-0246",
    title: "Wireless Keyboards",
    requester: "Aman Verma",
    department: "Marketing",
    category: "Accessories",
    quantity: 10,
    amount: 12000,
    date: "Nov 12, 2026",
    priority: "Low",
    status: "Rejected",
    reason: "Replacement keyboards for the marketing team.",
  },
  {
    id: "PR-0244",
    title: "Office Stationery",
    requester: "Neha Gupta",
    department: "Finance",
    category: "Supplies",
    quantity: 20,
    amount: 8500,
    date: "Nov 10, 2026",
    priority: "Low",
    status: "Approved",
    reason: "Monthly stationery replenishment.",
  },
];

const currency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const statusStyle = {
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Rejected: "bg-red-50 text-red-600 border-red-100",
};

const priorityStyle = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-gray-100 text-gray-500",
};

function Approvals() {
  const [approvals, setApprovals] = useState(initialApprovals);
  const [activeFilter, setActiveFilter] = useState("Pending");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [feedback, setFeedback] = useState({});

  const counts = {
    Pending: approvals.filter(a => a.status === "Pending").length,
    Approved: approvals.filter(a => a.status === "Approved").length,
    Rejected: approvals.filter(a => a.status === "Rejected").length,
  };

  const pendingValue = approvals
    .filter(a => a.status === "Pending")
    .reduce((sum, a) => sum + a.amount, 0);

  const filteredApprovals = useMemo(() => {
    return approvals.filter((item) => {
      const matchesStatus =
        activeFilter === "All" || item.status === activeFilter;

      const matchesSearch = [
        item.id,
        item.title,
        item.requester,
        item.department,
      ].some(value =>
        value.toLowerCase().includes(search.toLowerCase())
      );

      return matchesStatus && matchesSearch;
    });
  }, [approvals, activeFilter, search]);

  const handleDecision = (status) => {
    if (!selected) return;

    if (status === "Rejected" && !remarks.trim()) {
      setFeedback({
        type: "error",
        message: "Please provide a reason for rejection.",
      });
      return;
    }

    setApprovals(prev =>
      prev.map(item =>
        item.id === selected.id
          ? {
              ...item,
              status,
              remarks: remarks.trim(),
              reviewedBy: "You",
              reviewedOn: new Date().toLocaleDateString("en-IN"),
            }
          : item
      )
    );

    setSelected(null);
    setRemarks("");
    setFeedback({});
  };

  const stats = [
    {
      label: "Pending Approvals",
      value: counts.Pending,
      icon: Clock3,
      color: "text-amber-600",
      bg: "bg-amber-50",
      description: "Awaiting your review",
    },
    {
      label: "Approved",
      value: counts.Approved,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      description: "Successfully approved",
    },
    {
      label: "Rejected",
      value: counts.Rejected,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      description: "Declined requests",
    },
    {
      label: "Pending Value",
      value: currency(pendingValue),
      icon: IndianRupee,
      color: "text-blue-600",
      bg: "bg-blue-50",
      description: "Total amount awaiting approval",
    },
  ];

  return (
    <div className="space-y-7 text-[#171719]">

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[2px] text-gray-400">
            WORKSPACE / MANAGEMENT
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Approvals<span className="text-blue-600">.</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review requests and keep procurement moving.
          </p>
        </div>

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium hover:bg-gray-50"
        >
          <ClipboardCheck size={17} />
          {showHistory ? "View Approvals" : "Approval History"}
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

              <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                {stat.value}
              </h2>

              <p className="mt-2 text-xs text-gray-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Approval Queue */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-5">
          <div>
            <h2 className="font-semibold">
              {showHistory ? "Approval History" : "Approval Queue"}
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              {showHistory
                ? "Previously reviewed purchase requests"
                : "Requests waiting for your decision"}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search requests..."
              className="w-36 bg-transparent text-sm outline-none sm:w-48"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-6 overflow-x-auto border-b border-gray-100 px-5">
          {(showHistory
            ? ["All", "Approved", "Rejected"]
            : ["Pending", "All", "Approved", "Rejected"]
          ).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`whitespace-nowrap border-b-2 py-3 text-sm transition ${
                activeFilter === tab
                  ? "border-blue-600 font-semibold text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
              {tab !== "All" && (
                <span className="ml-2 text-xs text-gray-400">
                  {counts[tab]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50/70">
              <tr className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                <th className="px-5 py-4">Request Details</th>
                <th className="px-5 py-4">Requested By</th>
                <th className="px-5 py-4">Department</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredApprovals.map(item => (
                <tr
                  key={item.id}
                  className="transition hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-gray-100 p-2.5">
                        <Package size={18} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="mt-1 text-xs text-gray-400">
                          {item.id} · {item.date}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.requester}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.department}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium">
                    {currency(item.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${priorityStyle[item.priority]}`}>
                      {item.priority}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyle[item.status]}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => {
                        setSelected(item);
                        setRemarks(item.remarks || "");
                        setFeedback({});
                      }}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium hover:bg-gray-50"
                    >
                      <Eye size={14} />
                      Review
                    </button>
                  </td>
                </tr>
              ))}

              {filteredApprovals.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-14 text-center">
                    <ClipboardCheck
                      size={30}
                      className="mx-auto text-gray-300"
                    />
                    <p className="mt-3 text-sm font-medium text-gray-600">
                      No approvals found
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Try another filter or search term.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-400">
          Showing {filteredApprovals.length} requests
        </div>
      </div>

      {/* Review Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">

            <div className="flex items-start justify-between border-b border-gray-100 p-6">
              <div>
                <p className="text-xs font-medium text-gray-400">
                  {selected.id}
                </p>
                <h2 className="mt-2 text-xl font-semibold">
                  {selected.title}
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Submitted on {selected.date}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Requested Amount</p>
                <h2 className="mt-2 text-3xl font-semibold">
                  {currency(selected.amount)}
                </h2>
                <div className="mt-3 flex items-center gap-2">
                  <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${priorityStyle[selected.priority]}`}>
                    {selected.priority} Priority
                  </span>
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyle[selected.status]}`}>
                    {selected.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-100 p-2">
                    <User size={17} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Requester</p>
                    <p className="mt-1 text-sm font-medium">{selected.requester}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-100 p-2">
                    <Building2 size={17} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Department</p>
                    <p className="mt-1 text-sm font-medium">{selected.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-100 p-2">
                    <Package size={17} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Quantity</p>
                    <p className="mt-1 text-sm font-medium">{selected.quantity} units</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-100 p-2">
                    <CalendarDays size={17} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="mt-1 text-sm font-medium">{selected.date}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Category
                </p>
                <p className="text-sm font-medium">{selected.category}</p>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Justification
                </p>
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-sm leading-relaxed text-gray-600">
                    {selected.reason}
                  </p>
                </div>
              </div>

              {selected.status === "Pending" ? (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Review Remarks
                    </label>
                    <textarea
                      rows="3"
                      value={remarks}
                      onChange={e => setRemarks(e.target.value)}
                      placeholder="Add a comment or reason for rejection..."
                      className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  {feedback.message && (
                    <p className="text-xs text-red-600">
                      {feedback.message}
                    </p>
                  )}

                  <div className="flex gap-3 border-t border-gray-100 pt-5">
                    <button
                      onClick={() => handleDecision("Rejected")}
                      className="flex-1 rounded-lg border border-red-200 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Reject Request
                    </button>

                    <button
                      onClick={() => handleDecision("Approved")}
                      className="flex-1 rounded-lg bg-[#171719] py-3 text-sm font-medium text-white hover:bg-gray-800"
                    >
                      Approve Request
                    </button>
                  </div>
                </>
              ) : (
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <p className="text-sm font-medium">
                    Reviewed by {selected.reviewedBy || "Demo Administrator"}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {selected.remarks || "No additional remarks."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Approvals;
