
import { useMemo, useState } from "react";
import {
  Plus, Search, ShoppingCart, Clock3, CheckCircle2,
  Truck, X, Eye, Printer, Package, CalendarDays,
  Building2, IndianRupee, Trash2, ChevronDown,
  FileText, MapPin
} from "lucide-react";

const initialOrders = [
  {
    id: "PO-2026-001",
    supplier: "TechNova Solutions",
    date: "Nov 14, 2026",
    delivery: "Nov 25, 2026",
    status: "Processing",
    items: [
      { name: "MacBook Pro 14-inch", quantity: 2, price: 94950 },
    ],
    notes: "Required for engineering department.",
  },
  {
    id: "PO-2026-002",
    supplier: "Office Essentials Co.",
    date: "Nov 12, 2026",
    delivery: "Nov 20, 2026",
    status: "Sent",
    items: [
      { name: "Office Chairs", quantity: 5, price: 9000 },
    ],
    notes: "Standard office furniture order.",
  },
  {
    id: "PO-2026-003",
    supplier: "CloudSphere Technologies",
    date: "Nov 10, 2026",
    delivery: "Nov 18, 2026",
    status: "Delivered",
    items: [
      { name: "Cloud Server Subscription", quantity: 1, price: 65000 },
    ],
    notes: "Annual cloud subscription.",
  },
  {
    id: "PO-2026-004",
    supplier: "PrimeTech Distributors",
    date: "Nov 08, 2026",
    delivery: "Nov 19, 2026",
    status: "Draft",
    items: [
      { name: "Wireless Mouse", quantity: 10, price: 850 },
      { name: "Wireless Keyboard", quantity: 10, price: 1200 },
    ],
    notes: "Accessories for office employees.",
  },
  {
    id: "PO-2026-005",
    supplier: "Urban Workspace",
    date: "Nov 05, 2026",
    delivery: "Nov 12, 2026",
    status: "Cancelled",
    items: [
      { name: "Office Desk", quantity: 3, price: 7500 },
    ],
    notes: "Order cancelled due to budget revision.",
  },
];

const supplierOptions = [
  "TechNova Solutions",
  "Office Essentials Co.",
  "CloudSphere Technologies",
  "Urban Workspace",
  "PrintCraft India",
  "PrimeTech Distributors",
];

const statusStyles = {
  Draft: "bg-gray-100 text-gray-600 border-gray-200",
  Sent: "bg-blue-50 text-blue-700 border-blue-100",
  Processing: "bg-amber-50 text-amber-700 border-amber-100",
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Cancelled: "bg-red-50 text-red-600 border-red-100",
};

const currency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const emptyItem = () => ({
  name: "",
  quantity: 1,
  price: "",
});

const emptyForm = {
  supplier: "",
  delivery: "",
  notes: "",
  items: [emptyItem()],
};

function PurchaseOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const getTotal = (items) =>
    items.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.price),
      0
    );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        filter === "All" || order.status === filter;

      const matchesSearch = [
        order.id,
        order.supplier,
        order.status,
      ].some(value =>
        value.toLowerCase().includes(search.toLowerCase())
      );

      return matchesStatus && matchesSearch;
    });
  }, [orders, filter, search]);

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Processing",
      value: orders.filter(o => o.status === "Processing").length,
      icon: Clock3,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Delivered",
      value: orders.filter(o => o.status === "Delivered").length,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Total Order Value",
      value: currency(
        orders
          .filter(o => o.status !== "Cancelled" && o.status !== "Draft")
          .reduce((sum, o) => sum + getTotal(o.items), 0)
      ),
      icon: IndianRupee,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  const updateItem = (index, key, value) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const addItem = () => {
    setForm(prev => ({
      ...prev,
      items: [...prev.items, emptyItem()],
    }));
  };

  const removeItem = (index) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setError("");

    if (!form.supplier) {
      setError("Please select a supplier.");
      return;
    }

    if (
      form.items.some(item =>
        !item.name.trim() ||
        Number(item.quantity) <= 0 ||
        Number(item.price) <= 0
      )
    ) {
      setError("Please enter valid details for every item.");
      return;
    }

    const orderNumber = orders.length + 1;

    const newOrder = {
      id: `PO-2026-${String(orderNumber + 5).padStart(3, "0")}`,
      supplier: form.supplier,
      date: new Date().toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      delivery: new Date(form.delivery).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "Draft",
      items: form.items.map(item => ({
        ...item,
        quantity: Number(item.quantity),
        price: Number(item.price),
      })),
      notes: form.notes,
    };

    setOrders(prev => [newOrder, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
    setFilter("All");
    setSearch("");
  };

  const updateStatus = (id, status) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status } : order
      )
    );

    setSelected(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setForm(emptyForm);
    setError("");
  };

  return (
    <div className="space-y-7 text-[#171719]">

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[2px] text-gray-400">
            PROCUREMENT / ORDERS
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Purchase Orders<span className="text-blue-600">.</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage orders, monitor deliveries and track supplier commitments.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-[#171719] px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus size={17} />
          Create Purchase Order
        </button>
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
            </div>
          );
        })}
      </div>

      {/* Order Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-5">
          <div>
            <h2 className="font-semibold">All Purchase Orders</h2>
            <p className="mt-1 text-xs text-gray-400">
              Track and manage your purchase orders.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
              <Search size={16} className="text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search orders..."
                className="w-36 bg-transparent text-sm outline-none sm:w-48"
              />
            </div>

            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
            >
              {["All", "Draft", "Sent", "Processing", "Delivered", "Cancelled"].map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex gap-6 overflow-x-auto border-b border-gray-100 px-5">
          {["All", "Draft", "Sent", "Processing", "Delivered", "Cancelled"].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`whitespace-nowrap border-b-2 py-3 text-sm ${
                filter === tab
                  ? "border-blue-600 font-semibold text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50/70">
              <tr className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                <th className="px-5 py-4">Order ID</th>
                <th className="px-5 py-4">Supplier</th>
                <th className="px-5 py-4">Order Date</th>
                <th className="px-5 py-4">Expected Delivery</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(order => (
                <tr key={order.id} className="transition hover:bg-gray-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-gray-100 p-2">
                        <FileText size={17} className="text-gray-500" />
                      </div>
                      <span className="text-sm font-medium">{order.id}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {order.supplier}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {order.date}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {order.delivery}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium">
                    {currency(getTotal(order.items))}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelected(order)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-800"
                      title="View order"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-14 text-center">
                    <ShoppingCart size={30} className="mx-auto text-gray-300" />
                    <p className="mt-3 text-sm font-medium text-gray-600">
                      No purchase orders found
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-400">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      </div>

      {/* Create Purchase Order Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-lg font-semibold">Create Purchase Order</h2>
                <p className="mt-1 text-xs text-gray-400">
                  Add supplier and order item details.
                </p>
              </div>

              <button onClick={closeForm} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-6 p-6">

              <div>
                <label className="mb-2 block text-sm font-medium">Select Supplier</label>
                <select
                  required
                  value={form.supplier}
                  onChange={e => setForm({...form, supplier: e.target.value})}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Choose a supplier</option>
                  {supplierOptions.map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Expected Delivery Date</label>
                <input
                  required
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.delivery}
                  onChange={e => setForm({...form, delivery: e.target.value})}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              {/* Items */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">Order Items</h3>
                    <p className="mt-1 text-xs text-gray-400">
                      Add products and their quantities.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    <Plus size={15} />
                    Add Item
                  </button>
                </div>

                <div className="space-y-3">
                  {form.items.map((item, index) => (
                    <div key={index} className="rounded-xl border border-gray-200 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-500">
                          ITEM {index + 1}
                        </span>

                        {form.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="sm:col-span-3">
                          <label className="mb-1.5 block text-xs text-gray-500">
                            Product Name
                          </label>
                          <input
                            required
                            value={item.name}
                            onChange={e => updateItem(index, "name", e.target.value)}
                            placeholder="Enter product name"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs text-gray-500">
                            Quantity
                          </label>
                          <input
                            required
                            min="1"
                            type="number"
                            value={item.quantity}
                            onChange={e => updateItem(index, "quantity", e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="mb-1.5 block text-xs text-gray-500">
                            Unit Price (₹)
                          </label>
                          <input
                            required
                            min="0.01"
                            type="number"
                            step="0.01"
                            value={item.price}
                            onChange={e => updateItem(index, "price", e.target.value)}
                            placeholder="Enter unit price"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <span className="text-sm font-medium text-gray-600">
                  Estimated Order Total
                </span>
                <span className="text-xl font-semibold">
                  {currency(getTotal(form.items))}
                </span>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Additional Notes
                </label>
                <textarea
                  rows="2"
                  value={form.notes}
                  onChange={e => setForm({...form, notes: e.target.value})}
                  placeholder="Add instructions or delivery notes..."
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              {error && (
                <p className="text-xs text-red-600">{error}</p>
              )}

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#171719] px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Create Draft PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Purchase Order Details */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">

            <div className="flex items-start justify-between border-b border-gray-100 p-6">
              <div>
                <p className="text-xs font-medium text-gray-400">
                  PURCHASE ORDER
                </p>
                <h2 className="mt-2 text-xl font-semibold">{selected.id}</h2>
                <p className="mt-1 text-sm text-gray-400">{selected.supplier}</p>
              </div>

              <button onClick={() => setSelected(null)} className="rounded-lg p-2 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Order Status</span>
                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[selected.status]}`}>
                  {selected.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">Order Date</p>
                  <p className="mt-2 text-sm font-semibold">{selected.date}</p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">Expected Delivery</p>
                  <p className="mt-2 text-sm font-semibold">{selected.delivery}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold">Order Breakdown</h3>

                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full min-w-[400px] text-left">
                    <thead className="bg-gray-50 text-xs text-gray-500">
                      <tr>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Qty</th>
                        <th className="px-4 py-3">Unit Price</th>
                        <th className="px-4 py-3">Total</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {selected.items.map((item, i) => (
                        <tr key={i}>
                          <td className="px-4 py-3 text-sm">{item.name}</td>
                          <td className="px-4 py-3 text-sm">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm">{currency(item.price)}</td>
                          <td className="px-4 py-3 text-sm font-medium">
                            {currency(item.quantity * item.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-4">
                <span className="font-semibold">Order Total</span>
                <span className="text-xl font-semibold">
                  {currency(getTotal(selected.items))}
                </span>
              </div>

              {selected.notes && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs font-semibold text-gray-400">ORDER NOTES</p>
                  <p className="mt-2 text-sm text-gray-600">{selected.notes}</p>
                </div>
              )}

              {selected.status !== "Delivered" && selected.status !== "Cancelled" && (
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Update Order Status
                  </label>
                  <select
                    value={selected.status}
                    onChange={e => updateStatus(selected.id, e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    {["Draft", "Sent", "Processing", "Delivered", "Cancelled"].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={() => window.print()}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-sm font-medium hover:bg-gray-50"
              >
                <Printer size={17} />
                Print Purchase Order
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default PurchaseOrders;
