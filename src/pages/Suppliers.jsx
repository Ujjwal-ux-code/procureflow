
import { useMemo, useState } from "react";
import {
  Plus, Search, Truck, Users, Star, CheckCircle2,
  Clock3, XCircle, Eye, X, Mail, Phone, MapPin,
  Package, Building2, Globe, ArrowUpDown, MoreHorizontal,
  Award, FileText
} from "lucide-react";

const initialSuppliers = [
  {
    id: "SUP-001",
    name: "TechNova Solutions",
    category: "Electronics",
    contact: "Arjun Mehta",
    email: "sales@technova.in",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    orders: 42,
    spent: 1250000,
    status: "Active",
    joined: "Jan 12, 2025",
  },
  {
    id: "SUP-002",
    name: "Office Essentials Co.",
    category: "Office Supplies",
    contact: "Sneha Kapoor",
    email: "contact@officeessentials.in",
    phone: "+91 98765 12345",
    location: "Pune, Maharashtra",
    rating: 4.5,
    orders: 28,
    spent: 485000,
    status: "Active",
    joined: "Mar 05, 2025",
  },
  {
    id: "SUP-003",
    name: "CloudSphere Technologies",
    category: "Software",
    contact: "Vikram Rao",
    email: "hello@cloudsphere.in",
    phone: "+91 99887 77665",
    location: "Bengaluru, Karnataka",
    rating: 4.9,
    orders: 19,
    spent: 890000,
    status: "Active",
    joined: "Feb 18, 2025",
  },
  {
    id: "SUP-004",
    name: "Urban Workspace",
    category: "Furniture",
    contact: "Riya Shah",
    email: "sales@urbanworkspace.in",
    phone: "+91 98761 23456",
    location: "Delhi, India",
    rating: 4.2,
    orders: 15,
    spent: 325000,
    status: "Active",
    joined: "Jun 21, 2025",
  },
  {
    id: "SUP-005",
    name: "PrintCraft India",
    category: "Printing",
    contact: "Karan Malhotra",
    email: "info@printcraft.in",
    phone: "+91 98111 22334",
    location: "Jaipur, Rajasthan",
    rating: 3.9,
    orders: 8,
    spent: 95000,
    status: "Inactive",
    joined: "Aug 10, 2025",
  },
  {
    id: "SUP-006",
    name: "PrimeTech Distributors",
    category: "Electronics",
    contact: "Ananya Verma",
    email: "orders@primetech.in",
    phone: "+91 97654 32109",
    location: "Hyderabad, Telangana",
    rating: 4.6,
    orders: 31,
    spent: 760000,
    status: "Active",
    joined: "Apr 14, 2025",
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Inactive: "bg-gray-100 text-gray-500 border-gray-200",
};

const emptyForm = {
  name: "",
  category: "Electronics",
  contact: "",
  email: "",
  phone: "",
  location: "",
};

function Suppliers() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showCompare, setShowCompare] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const activeCount = suppliers.filter(s => s.status === "Active").length;
  const inactiveCount = suppliers.filter(s => s.status === "Inactive").length;

  const totalOrders = suppliers.reduce((sum, s) => sum + s.orders, 0);
  const totalSpent = suppliers.reduce((sum, s) => sum + s.spent, 0);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => {
      const matchesSearch = [
        supplier.name,
        supplier.contact,
        supplier.id,
        supplier.category,
      ].some(value =>
        value.toLowerCase().includes(search.toLowerCase())
      );

      const matchesCategory =
        category === "All" || supplier.category === category;

      const matchesStatus =
        status === "All" || supplier.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [suppliers, search, category, status]);

  const categories = [...new Set(suppliers.map(s => s.category))];

  const handleAddSupplier = (e) => {
    e.preventDefault();
    setFormError("");

    if (suppliers.some(s => s.email.toLowerCase() === form.email.trim().toLowerCase())) {
      setFormError("A supplier with this email already exists.");
      return;
    }

    const newSupplier = {
      ...form,
      id: `SUP-${String(suppliers.length + 1).padStart(3, "0")}`,
      rating: 0,
      orders: 0,
      spent: 0,
      status: "Active",
      joined: new Date().toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setSuppliers(prev => [newSupplier, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setSuppliers(prev =>
      prev.map(s =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
          : s
      )
    );

    setSelected(null);
  };

  const toggleCompare = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const comparisonSuppliers = suppliers.filter(s =>
    selectedIds.includes(s.id)
  );

  const stats = [
    {
      label: "Total Suppliers",
      value: suppliers.length,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      note: "Registered vendors",
    },
    {
      label: "Active Suppliers",
      value: activeCount,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      note: "Currently available",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: Package,
      color: "text-violet-600",
      bg: "bg-violet-50",
      note: "Orders placed",
    },
    {
      label: "Total Spending",
      value: formatCurrency(totalSpent),
      icon: Truck,
      color: "text-amber-600",
      bg: "bg-amber-50",
      note: "Across all suppliers",
    },
  ];

  return (
    <div className="space-y-7 text-[#171719]">

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[2px] text-gray-400">
            PROCUREMENT / MANAGEMENT
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Suppliers<span className="text-blue-600">.</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage vendors, track performance and compare suppliers.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowCompare(true)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium hover:bg-gray-50"
          >
            Compare ({selectedIds.length})
          </button>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-[#171719] px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus size={17} />
            Add Supplier
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(stat => {
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
              <p className="mt-2 text-xs text-gray-400">{stat.note}</p>
            </div>
          );
        })}
      </div>

      {/* Supplier Directory */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-5">
          <div>
            <h2 className="font-semibold">Supplier Directory</h2>
            <p className="mt-1 text-xs text-gray-400">
              Your registered supplier network
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
              <Search size={16} className="text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search suppliers..."
                className="w-36 bg-transparent text-sm outline-none sm:w-48"
              />
            </div>

            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
            >
              <option value="All">All Categories</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>

            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-gray-50/70">
              <tr className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                <th className="px-5 py-4">Supplier</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Contact Person</th>
                <th className="px-5 py-4">Rating</th>
                <th className="px-5 py-4">Orders</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Compare</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredSuppliers.map(supplier => (
                <tr key={supplier.id} className="transition hover:bg-gray-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-semibold text-blue-700">
                        {supplier.name.split(" ").map(x => x[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{supplier.name}</p>
                        <p className="mt-1 text-xs text-gray-400">{supplier.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {supplier.category}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-700">{supplier.contact}</p>
                    <p className="mt-1 text-xs text-gray-400">{supplier.email}</p>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Star size={15} className="fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">
                        {supplier.rating ? supplier.rating.toFixed(1) : "New"}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {supplier.orders}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[supplier.status]}`}>
                      {supplier.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(supplier.id)}
                      onChange={() => toggleCompare(supplier.id)}
                      disabled={!selectedIds.includes(supplier.id) && selectedIds.length >= 3}
                      className="h-4 w-4 cursor-pointer accent-blue-600 disabled:cursor-not-allowed"
                    />
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelected(supplier)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-800"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredSuppliers.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-14 text-center">
                    <Truck size={30} className="mx-auto text-gray-300" />
                    <p className="mt-3 text-sm font-medium text-gray-600">
                      No suppliers found
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Try adjusting your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-400">
          Showing {filteredSuppliers.length} of {suppliers.length} suppliers
        </div>
      </div>

      {/* Add Supplier Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-lg font-semibold">Add New Supplier</h2>
                <p className="mt-1 text-xs text-gray-400">
                  Enter the supplier's business and contact details.
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSupplier} className="space-y-4 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium">Company Name</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="Enter company name"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  {["Electronics", "Office Supplies", "Software", "Furniture", "Printing", "Services", "Other"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Contact Person</label>
                  <input
                    required
                    value={form.contact}
                    onChange={e => setForm({...form, contact: e.target.value})}
                    placeholder="Full name"
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Email Address</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    placeholder="supplier@email.com"
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Phone Number</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Location</label>
                  <input
                    required
                    value={form.location}
                    onChange={e => setForm({...form, location: e.target.value})}
                    placeholder="City, State"
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {formError && (
                <p className="text-xs text-red-600">{formError}</p>
              )}

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
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Supplier Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 font-semibold text-blue-700">
                  {selected.name.split(" ").map(x => x[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{selected.name}</h2>
                  <p className="mt-1 text-xs text-gray-400">{selected.id}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-lg p-2 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Supplier Status</span>
                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[selected.status]}`}>
                  {selected.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">Rating</p>
                  <p className="mt-2 flex items-center gap-1 text-xl font-semibold">
                    <Star size={17} className="fill-amber-400 text-amber-400" />
                    {selected.rating ? selected.rating.toFixed(1) : "New"}
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">Total Orders</p>
                  <p className="mt-2 text-xl font-semibold">{selected.orders}</p>
                </div>
                <div className="col-span-2 rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">Total Business Value</p>
                  <p className="mt-2 text-xl font-semibold">{formatCurrency(selected.spent)}</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  [Building2, "Category", selected.category],
                  [User, "Contact Person", selected.contact],
                  [Mail, "Email", selected.email],
                  [Phone, "Phone", selected.phone],
                  [MapPin, "Location", selected.location],
                  [CalendarDays, "Registered On", selected.joined],
                ].map(([Icon, label, value]) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="rounded-lg bg-gray-100 p-2">
                      <Icon size={16} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="mt-0.5 text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => toggleStatus(selected.id)}
                className={`w-full rounded-lg border py-3 text-sm font-medium ${
                  selected.status === "Active"
                    ? "border-red-200 text-red-600 hover:bg-red-50"
                    : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                {selected.status === "Active" ? "Deactivate Supplier" : "Activate Supplier"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Supplier Comparison */}
      {showCompare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="my-auto w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-lg font-semibold">Supplier Comparison</h2>
                <p className="mt-1 text-xs text-gray-400">
                  Compare supplier performance side by side.
                </p>
              </div>
              <button onClick={() => setShowCompare(false)} className="rounded-lg p-2 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {comparisonSuppliers.length < 2 ? (
                <div className="py-10 text-center">
                  <Users size={32} className="mx-auto text-gray-300" />
                  <h3 className="mt-3 font-medium">Select at least two suppliers</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Choose up to three suppliers using the checkboxes in the directory.
                  </p>
                  <button
                    onClick={() => setShowCompare(false)}
                    className="mt-5 rounded-lg bg-[#171719] px-5 py-2.5 text-sm text-white"
                  >
                    Select Suppliers
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-left">
                    <thead>
                      <tr>
                        <th className="py-3 text-xs text-gray-400">Metric</th>
                        {comparisonSuppliers.map(s => (
                          <th key={s.id} className="px-3 py-3 text-sm font-semibold">{s.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        ["Category", s => s.category],
                        ["Rating", s => s.rating ? `${s.rating}/5` : "New"],
                        ["Total Orders", s => s.orders],
                        ["Business Value", s => formatCurrency(s.spent)],
                        ["Status", s => s.status],
                      ].map(([label, getValue]) => (
                        <tr key={label}>
                          <td className="py-4 text-sm text-gray-500">{label}</td>
                          {comparisonSuppliers.map(s => (
                            <td key={s.id} className="px-3 py-4 text-sm font-medium">{getValue(s)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-5 text-xs text-gray-400">
                    Comparison is based on recorded supplier performance, not live quotations.
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

export default Suppliers;
