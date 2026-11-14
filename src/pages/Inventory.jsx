
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Package,
  Boxes,
  AlertTriangle,
  IndianRupee,
  X,
  Eye,
  Pencil,
  Trash2,
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  TrendingUp,
  Minus,
  CheckCircle2,
} from "lucide-react";

const initialInventory = [
  {
    id: "INV-001",
    name: "MacBook Pro 14-inch",
    sku: "ELEC-001",
    category: "Electronics",
    quantity: 12,
    minStock: 5,
    unit: "Units",
    price: 125000,
    location: "Warehouse A",
    supplier: "TechNova Solutions",
  },
  {
    id: "INV-002",
    name: "Wireless Keyboard",
    sku: "ACC-002",
    category: "Accessories",
    quantity: 8,
    minStock: 10,
    unit: "Units",
    price: 1800,
    location: "Warehouse A",
    supplier: "PrimeTech Distributors",
  },
  {
    id: "INV-003",
    name: "Office Chair",
    sku: "FUR-003",
    category: "Furniture",
    quantity: 24,
    minStock: 8,
    unit: "Units",
    price: 7500,
    location: "Warehouse B",
    supplier: "Urban Workspace",
  },
  {
    id: "INV-004",
    name: "A4 Paper Reams",
    sku: "SUP-004",
    category: "Office Supplies",
    quantity: 4,
    minStock: 15,
    unit: "Reams",
    price: 350,
    location: "Storage Room",
    supplier: "Office Essentials Co.",
  },
  {
    id: "INV-005",
    name: "Wireless Mouse",
    sku: "ACC-005",
    category: "Accessories",
    quantity: 32,
    minStock: 10,
    unit: "Units",
    price: 850,
    location: "Warehouse A",
    supplier: "PrimeTech Distributors",
  },
  {
    id: "INV-006",
    name: "Office Desk",
    sku: "FUR-006",
    category: "Furniture",
    quantity: 6,
    minStock: 5,
    unit: "Units",
    price: 9500,
    location: "Warehouse B",
    supplier: "Urban Workspace",
  },
  {
    id: "INV-007",
    name: "USB-C Hub",
    sku: "ELEC-007",
    category: "Electronics",
    quantity: 0,
    minStock: 5,
    unit: "Units",
    price: 2200,
    location: "Warehouse A",
    supplier: "TechNova Solutions",
  },
];

const initialMovements = [
  {
    id: 1,
    item: "MacBook Pro 14-inch",
    type: "In",
    quantity: 5,
    date: "Nov 14, 2026",
    note: "New stock received",
  },
  {
    id: 2,
    item: "Wireless Keyboard",
    type: "Out",
    quantity: 4,
    date: "Nov 13, 2026",
    note: "Issued to Engineering",
  },
  {
    id: 3,
    item: "Office Chair",
    type: "In",
    quantity: 10,
    date: "Nov 12, 2026",
    note: "Supplier delivery",
  },
];

const emptyForm = {
  name: "",
  sku: "",
  category: "Electronics",
  quantity: "",
  minStock: "",
  unit: "Units",
  price: "",
  location: "",
  supplier: "",
};

const currency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function getStockStatus(item) {
  if (item.quantity === 0) return "Out of Stock";
  if (item.quantity <= item.minStock) return "Low Stock";
  return "In Stock";
}

const stockStyles = {
  "In Stock": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Low Stock": "bg-amber-50 text-amber-700 border-amber-100",
  "Out of Stock": "bg-red-50 text-red-600 border-red-100",
};

function Inventory() {
  const [items, setItems] = useState(initialInventory);
  const [movements, setMovements] = useState(initialMovements);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [showMovement, setShowMovement] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [movementForm, setMovementForm] = useState({
    type: "In",
    quantity: 1,
    note: "",
  });

  const [error, setError] = useState("");

  const categories = [...new Set(items.map(item => item.category))];

  const lowStock = items.filter(
    item => item.quantity > 0 && item.quantity <= item.minStock
  );

  const outOfStock = items.filter(item => item.quantity === 0);

  const totalUnits = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const stockValue = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = [
        item.name,
        item.sku,
        item.supplier,
        item.location,
      ].some(value =>
        value.toLowerCase().includes(search.toLowerCase())
      );

      const matchesCategory =
        category === "All" || item.category === category;

      const status = getStockStatus(item);

      const matchesStock =
        stockFilter === "All" || status === stockFilter;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [items, search, category, stockFilter]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
    setError("");
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setError("");
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditing(item.id);
    setForm({
      name: item.name,
      sku: item.sku,
      category: item.category,
      quantity: String(item.quantity),
      minStock: String(item.minStock),
      unit: item.unit,
      price: String(item.price),
      location: item.location,
      supplier: item.supplier,
    });
    setSelected(null);
    setShowForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setError("");

    const duplicate = items.some(
      item =>
        item.sku.toLowerCase() === form.sku.trim().toLowerCase() &&
        item.id !== editing
    );

    if (duplicate) {
      setError("An item with this SKU already exists.");
      return;
    }

    const quantity = Number(form.quantity);
    const price = Number(form.price);
    const minStock = Number(form.minStock);

    if (
      !Number.isInteger(quantity) ||
      quantity < 0 ||
      !Number.isInteger(minStock) ||
      minStock < 0 ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      setError("Enter valid quantity, minimum stock and price.");
      return;
    }

    if (editing) {
      setItems(prev =>
        prev.map(item =>
          item.id === editing
            ? {
                ...item,
                ...form,
                quantity,
                minStock,
                price,
              }
            : item
        )
      );
    } else {
      const newItem = {
        ...form,
        id: `INV-${String(Date.now()).slice(-6)}`,
        quantity,
        minStock,
        price,
      };

      setItems(prev => [newItem, ...prev]);
    }

    resetForm();
  };

  const openMovementForm = (item) => {
    setSelected(item);
    setMovementForm({
      type: "In",
      quantity: 1,
      note: "",
    });
    setError("");
    setShowMovement(true);
  };

  const handleMovement = (e) => {
    e.preventDefault();

    const quantity = Number(movementForm.quantity);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      setError("Enter a valid quantity.");
      return;
    }

    const item = items.find(i => i.id === selected.id);

    if (movementForm.type === "Out" && quantity > item.quantity) {
      setError("Not enough stock available for this transaction.");
      return;
    }

    setItems(prev =>
      prev.map(i =>
        i.id === selected.id
          ? {
              ...i,
              quantity:
                movementForm.type === "In"
                  ? i.quantity + quantity
                  : i.quantity - quantity,
            }
          : i
      )
    );

    setMovements(prev => [
      {
        id: Date.now(),
        item: selected.name,
        type: movementForm.type,
        quantity,
        date: new Date().toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        note: movementForm.note || "Manual stock adjustment",
      },
      ...prev,
    ]);

    setShowMovement(false);
    setSelected(null);
    setError("");
  };

  const deleteItem = (id) => {
    const item = items.find(i => i.id === id);

    if (!window.confirm(`Delete ${item.name} from inventory?`)) return;

    setItems(prev => prev.filter(i => i.id !== id));
    setSelected(null);
  };

  const stats = [
    {
      label: "Total Products",
      value: items.length,
      icon: Boxes,
      color: "text-blue-600",
      bg: "bg-blue-50",
      note: "Registered inventory items",
    },
    {
      label: "Total Stock Units",
      value: totalUnits.toLocaleString("en-IN"),
      icon: Package,
      color: "text-violet-600",
      bg: "bg-violet-50",
      note: "Across all categories",
    },
    {
      label: "Low Stock Items",
      value: lowStock.length,
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      note: "Require replenishment",
    },
    {
      label: "Inventory Value",
      value: currency(stockValue),
      icon: IndianRupee,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      note: "Current stock valuation",
    },
  ];

  return (
    <div className="space-y-7 text-[#171719]">

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[2px] text-gray-400">
            PROCUREMENT / INVENTORY
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Inventory<span className="text-blue-600">.</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Monitor stock levels, manage products and track inventory movement.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center gap-2 rounded-lg bg-[#171719] px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus size={17} />
          Add Inventory Item
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

              <p className="mt-2 text-xs text-gray-400">{stat.note}</p>
            </div>
          );
        })}
      </div>

      {/* Stock Alerts */}
      {(lowStock.length > 0 || outOfStock.length > 0) && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-600" />
            <h2 className="text-sm font-semibold">Stock Alerts</h2>
          </div>

          <p className="mt-2 text-sm text-gray-600">
            {lowStock.length} items have low stock and {outOfStock.length} items are out of stock.
            Consider replenishing them.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {outOfStock.map(item => (
              <button
                key={item.id}
                onClick={() => setStockFilter("Out of Stock")}
                className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                {item.name} · Out of stock
              </button>
            ))}

            {lowStock.map(item => (
              <button
                key={item.id}
                onClick={() => setStockFilter("Low Stock")}
                className="rounded-lg border border-amber-200 bg-white px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50"
              >
                {item.name} · Low stock
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Directory */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-5">
          <div>
            <h2 className="font-semibold">Inventory Directory</h2>
            <p className="mt-1 text-xs text-gray-400">
              Manage your products and stock availability.
            </p>
          </div>

          <button
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
          >
            <History size={16} />
            Stock History
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-2 border-b border-gray-100 p-5">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search inventory..."
              className="w-36 bg-transparent text-sm outline-none sm:w-48"
            />
          </div>

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
          >
            <option value="All">All Categories</option>
            {categories.map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={e => setStockFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
          >
            <option value="All">All Stock Levels</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-gray-50/70">
              <tr className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Stock Level</th>
                <th className="px-5 py-4">Unit Price</th>
                <th className="px-5 py-4">Stock Value</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredItems.map(item => {
                const stockStatus = getStockStatus(item);

                return (
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
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="mt-1 text-xs text-gray-400">
                            {item.sku}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {item.category}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium">
                        {item.quantity} {item.unit}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Minimum: {item.minStock}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {currency(item.price)}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium">
                      {currency(item.quantity * item.price)}
                    </td>

                    <td className="px-5 py-4">
                      <span className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${stockStyles[stockStatus]}`}>
                        {stockStatus}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openMovementForm(item)}
                          title="Update stock"
                          className="rounded-lg p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <ArrowDownToLine size={16} />
                        </button>

                        <button
                          onClick={() => setSelected(item)}
                          title="View details"
                          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-800"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-14 text-center">
                    <Package size={30} className="mx-auto text-gray-300" />
                    <p className="mt-3 text-sm font-medium text-gray-600">
                      No inventory items found
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
          Showing {filteredItems.length} of {items.length} products
        </div>
      </div>

      {/* Add / Edit Item Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-lg font-semibold">
                  {editing ? "Edit Inventory Item" : "Add Inventory Item"}
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Enter product and stock information.
                </p>
              </div>

              <button onClick={resetForm} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium">Product Name</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="Enter product name"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">SKU</label>
                  <input
                    required
                    value={form.sku}
                    onChange={e => setForm({...form, sku: e.target.value})}
                    placeholder="e.g. ELEC-001"
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    {["Electronics", "Accessories", "Furniture", "Office Supplies", "Software", "Other"].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Quantity</label>
                  <input
                    required
                    type="number"
                    min="0"
                    step="1"
                    value={form.quantity}
                    onChange={e => setForm({...form, quantity: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Minimum Stock</label>
                  <input
                    required
                    type="number"
                    min="0"
                    step="1"
                    value={form.minStock}
                    onChange={e => setForm({...form, minStock: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Unit Price (₹)</label>
                  <input
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.price}
                    onChange={e => setForm({...form, price: e.target.value})}
                    placeholder="Enter price"
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Unit</label>
                  <select
                    value={form.unit}
                    onChange={e => setForm({...form, unit: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    {["Units", "Pieces", "Boxes", "Reams", "Kg", "Litres"].map(u => (
                      <option key={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Storage Location</label>
                  <input
                    required
                    value={form.location}
                    onChange={e => setForm({...form, location: e.target.value})}
                    placeholder="Warehouse A"
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Supplier</label>
                  <input
                    required
                    value={form.supplier}
                    onChange={e => setForm({...form, supplier: e.target.value})}
                    placeholder="Supplier name"
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#171719] px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                  {editing ? "Save Changes" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stock Movement Modal */}
      {showMovement && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-lg font-semibold">Update Stock</h2>
                <p className="mt-1 text-xs text-gray-400">{selected.name}</p>
              </div>

              <button
                onClick={() => setShowMovement(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleMovement} className="space-y-5 p-6">

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">Current Available Stock</p>
                <p className="mt-2 text-2xl font-semibold">
                  {selected.quantity} {selected.unit}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Movement Type</label>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: "In", label: "Stock In", icon: ArrowDownToLine },
                    { type: "Out", label: "Stock Out", icon: ArrowUpFromLine },
                  ].map(option => {
                    const Icon = option.icon;

                    return (
                      <button
                        key={option.type}
                        type="button"
                        onClick={() => setMovementForm({...movementForm, type: option.type})}
                        className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium ${
                          movementForm.type === option.type
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 text-gray-500"
                        }`}
                      >
                        <Icon size={17} />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Quantity</label>
                <input
                  required
                  min="1"
                  step="1"
                  type="number"
                  value={movementForm.quantity}
                  onChange={e => setMovementForm({...movementForm, quantity: e.target.value})}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Remarks</label>
                <textarea
                  rows="3"
                  value={movementForm.note}
                  onChange={e => setMovementForm({...movementForm, note: e.target.value})}
                  placeholder="Reason for stock adjustment..."
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-lg bg-[#171719] py-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                Confirm Stock Movement
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Item Details Modal */}
      {selected && !showMovement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            <div className="flex items-start justify-between border-b border-gray-100 p-6">
              <div>
                <p className="text-xs text-gray-400">{selected.sku}</p>
                <h2 className="mt-2 text-xl font-semibold">{selected.name}</h2>
              </div>

              <button onClick={() => setSelected(null)} className="rounded-lg p-2 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Stock Status</span>
                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${stockStyles[getStockStatus(selected)]}`}>
                  {getStockStatus(selected)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">Available Quantity</p>
                  <p className="mt-2 text-2xl font-semibold">{selected.quantity}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">Minimum Stock</p>
                  <p className="mt-2 text-2xl font-semibold">{selected.minStock}</p>
                </div>
              </div>

              {[
                ["Category", selected.category],
                ["Unit", selected.unit],
                ["Unit Price", currency(selected.price)],
                ["Total Stock Value", currency(selected.quantity * selected.price)],
                ["Supplier", selected.supplier],
                ["Storage Location", selected.location],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-gray-50 pb-3">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-right text-sm font-medium">{value}</span>
                </div>
              ))}

              <div className="flex gap-2">
                <button
                  onClick={() => openEditForm(selected)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-sm font-medium hover:bg-gray-50"
                >
                  <Pencil size={15} />
                  Edit Item
                </button>

                <button
                  onClick={() => openMovementForm(selected)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#171719] py-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                  <ArrowDownToLine size={15} />
                  Update Stock
                </button>
              </div>

              <button
                onClick={() => deleteItem(selected.id)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 size={15} />
                Delete Inventory Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stock History Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-lg font-semibold">Stock Movement History</h2>
                <p className="mt-1 text-xs text-gray-400">
                  Record of inventory additions and deductions.
                </p>
              </div>

              <button onClick={() => setShowHistory(false)} className="rounded-lg p-2 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-6">
              {movements.length === 0 ? (
                <p className="py-10 text-center text-sm text-gray-400">
                  No stock movements recorded yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {movements.map(movement => (
                    <div key={movement.id} className="flex items-start gap-3 border-b border-gray-100 pb-4">
                      <div className={`rounded-lg p-2 ${
                        movement.type === "In"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-600"
                      }`}>
                        {movement.type === "In"
                          ? <ArrowDownToLine size={18} />
                          : <ArrowUpFromLine size={18} />
                        }
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{movement.item}</p>
                        <p className="mt-1 text-xs text-gray-400">{movement.note}</p>
                        <p className="mt-1 text-xs text-gray-400">{movement.date}</p>
                      </div>

                      <span className={`text-sm font-semibold ${
                        movement.type === "In" ? "text-emerald-600" : "text-red-600"
                      }`}>
                        {movement.type === "In" ? "+" : "-"}{movement.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
