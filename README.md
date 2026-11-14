# ProcureFlow

**A Smarter Way to Manage Procurement.**

ProcureFlow is a modern procurement management platform designed to simplify and streamline business purchasing operations. It brings purchase requests, approval workflows, supplier management, purchase orders, inventory tracking, and procurement analytics into one centralized workspace.

The goal is to make procurement more organized, transparent, and efficient while reducing manual work and improving visibility into business spending.

---

## Overview

Procurement often involves multiple departments, approval processes, suppliers, and inventory records. Managing these activities separately can lead to delays, communication gaps, and inefficient purchasing decisions.

ProcureFlow aims to solve this by providing a centralized platform where businesses can manage their entire procurement workflow.

## Features

### 1. Dashboard
- Centralized overview of procurement activities.
- Key metrics for purchase requests, pending approvals, active orders, and suppliers.
- Procurement spending visualization.
- Recent activity overview.

### 2. Purchase Requests
- Create and manage purchase requests.
- Add item details, quantity, category, department, and estimated cost.
- Track request status.
- View request details and priority.

### 3. Approval Management
- Dedicated approval dashboard.
- Review pending purchase requests.
- Approve or reject requests.
- Add remarks during the review process.
- Track approval history.

### 4. Supplier Management
- Maintain supplier records.
- Add and manage supplier information.
- Track supplier categories and status.
- View supplier details.
- Compare suppliers based on available performance information.

### 5. Purchase Order Management
- Create purchase orders.
- Select suppliers and add multiple products.
- Automatically calculate order totals.
- Set expected delivery dates.
- Track order status.
- View and print purchase order details.

### 6. Inventory Management
- Maintain product and stock records.
- Add, edit, and remove inventory items.
- Monitor available stock levels.
- Identify low-stock and out-of-stock products.
- Record stock-in and stock-out movements.
- View stock movement history.

### 7. Reports & Analytics
- Visualize procurement spending trends.
- Analyze department-wise expenditure.
- Monitor purchase order distribution.
- Review supplier performance.
- Track inventory health.
- Export spending reports in CSV format.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Development server and build tool |
| Tailwind CSS | UI styling |
| React Router DOM | Client-side navigation |
| Recharts | Data visualization |
| Lucide React | Icons |
| JavaScript | Application logic |

---

## Project Structure

```text
procureflow/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── navigation/
│   │   │   └── Sidebar.jsx
│   │   │
│   │   └── ui/
│   │       └── Header.jsx
│   │
│   ├── hooks/
│   │
│   ├── layouts/
│   │   └── DashboardLayout.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Requests.jsx
│   │   ├── Approvals.jsx
│   │   ├── Suppliers.jsx
│   │   ├── PurchaseOrders.jsx
│   │   ├── Inventory.jsx
│   │   └── Reports.jsx
│   │
│   ├── routes/
│   ├── services/
│   ├── utils/
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Getting Started

Follow these steps to run ProcureFlow locally.

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS version recommended)
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Ujjwal-ux-code/procureflow.git
```

### 2. Navigate to the Project Directory

```bash
cd procureflow
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open in Browser

Visit the local URL provided by Vite, usually:

```text
http://localhost:5173
```

---

## Current Development Status

ProcureFlow currently has a frontend implementation with interactive UI components and demonstration data.

| Module | Status |
|---|---|
| Dashboard | Implemented |
| Purchase Requests | Implemented |
| Approvals | Implemented |
| Supplier Management | Implemented |
| Purchase Orders | Implemented |
| Inventory Management | Implemented |
| Reports & Analytics | Implemented |

**Note:** The current modules primarily use local demonstration data. Backend integration, persistent database storage, and synchronization between modules are planned for future development.

---

## Future Scope

Some planned improvements include:

- Backend API integration.
- Database integration for persistent records.
- Real-time synchronization across procurement modules.
- Automated approval workflows.
- Role-based access control.
- Email and in-app notifications.
- Advanced procurement analytics.
- Supplier performance tracking.
- Purchase order and inventory automation.

---

## Contributing

Contributions, suggestions, and feedback are welcome.

If you would like to contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

## License

This project is currently developed for educational and project demonstration purposes.

---

**ProcureFlow — Making procurement simpler, smarter, and more transparent.**
