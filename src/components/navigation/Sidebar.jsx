
import { NavLink } from "react-router-dom";
import {
  Layers,
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  Truck,
  ShoppingBag,
  Package,
  ChartNoAxesCombined,
} from "lucide-react";

const navigation = [
  {
    heading: "WORKSPACE",
    items: [
      { name: "Overview", path: "/", icon: LayoutDashboard },
      { name: "Requests", path: "/requests", icon: FileText },
      { name: "Approvals", path: "/approvals", icon: ClipboardCheck },
    ],
  },
  {
    heading: "PROCUREMENT",
    items: [
      { name: "Suppliers", path: "/suppliers", icon: Truck },
      { name: "Purchase Orders", path: "/purchase-orders", icon: ShoppingBag },
      { name: "Inventory", path: "/inventory", icon: Package },
    ],
  },
  {
    heading: "INSIGHTS",
    items: [
      { name: "Reports", path: "/reports", icon: ChartNoAxesCombined },
    ],
  },
];

function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[250px] shrink-0 flex-col bg-[#17191F] text-white">
      {/* Brand */}
      <div className="flex h-[76px] items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
          <Layers size={21} />
        </div>

        <span className="text-lg font-semibold tracking-tight">
          procureflow
          <span className="text-blue-400">.</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-7">
        {navigation.map((section) => (
          <div key={section.heading}>
            <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.16em] text-gray-500">
              {section.heading}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    <Icon size={18} strokeWidth={1.8} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-300">
            AD
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-200">Admin</p>
            <p className="text-xs text-gray-500">Workspace account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
