const navigations = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  // { label: "PAGES", type: "label" },
  // {
  //   name: "Session/Auth",
  //   icon: "security",
  //   children: [
  //     { name: "Sign in", iconText: "SI", path: "/session/signin" },
  //     { name: "Sign up", iconText: "SU", path: "/session/signup" },
  //     { name: "Forgot Password", iconText: "FP", path: "/session/forgot-password" },
  //     { name: "Error", iconText: "404", path: "/session/404" }
  //   ]
  // },
  { label: "Menu", type: "label" },
  {
    name: "Products",
    icon: "account_circle",
    badge: { color: "secondary" },
    allowedRoles: ["admin", 'wholesaler', 'retailer'],
    children: [
      { 
        name: "AMPC", 
        icon: "apps",
        level: 2,
        allowedRoles: ["admin"],
        children: [
          { name: "Create", path: "/features/apmc/create", iconText: "A"},
          { name: "View", path: "/features/apmc/view", iconText: "A" },
        ] 
      },
      { 
        name: "Product Master", 
        icon: "apps",
        level: 2,
        allowedRoles: ["admin", 'wholesaler', 'retailer'],
        children: [
          { name: "Create", path: "/features/product/create", iconText: "A" },
          { name: "View", path: "/features/product/view", iconText: "A" },
        ] 
      },
      { 
        name: "Category", 
        icon: "apps",
        level: 2,
        allowedRoles: ["admin"],
        children: [
          { name: "Create", path: "/features/category/create", iconText: "A" },
          { name: "View", path: "/features/category/view", iconText: "A" },
        ] 
      },
      { name: "Product Reviews", path: "/features/product/reviews", icon: "assignment"},
    ]
  },
  {
    name: "WholeSeller",
    icon: "account_circle",
    badge: { color: "secondary" },
    allowedRoles: ["admin"],
    children: [
      { 
        name: "WholeSeller User", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/features/wholesaler/create", iconText: "A" },
          { name: "View", path: "/features/wholesaler/view", iconText: "A" },
        ] 
      },
      { name: "View Products", level: 2, path: "/wholesaler/view-products", icon: "assignment" },
      { name: "WholeSeller KYC", level: 2, path: "/wholesaler/wholesaler-kyc", icon: "assignment" },
    ]
  },
  {
    name: "Retailer",
    icon: "account_circle",
    badge: { color: "secondary" },
    allowedRoles: ["admin"],
    children: [
      { 
        name: "Retailer User", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/features/retailer/create", iconText: "A" },
          { name: "View", path: "/features/retailer/view", iconText: "A" },
        ] 
      },
      { name: "Retailer KYC", level: 2, path: "/retailer/retailer-kyc", icon: "assignment" },
    ]
  },
  {
    name: "Delivery",
    icon: "account_circle",
    badge: { color: "secondary" },
    allowedRoles: ["admin"],
    children: [
      { 
        name: "Delivery User", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/features/delivery/create", iconText: "A" },
          { name: "View", path: "/features/delivery/view", iconText: "A" },
        ] 
      },
      { name: "Delivery KYC", level: 2, path: "/delivery/delivery-kyc", icon: "assignment" },
    ]
  },
  {
    name: "Orders",
    icon: "account_circle",
    badge: { color: "secondary" },
    allowedRoles: ["admin", 'wholesaler', 'retailer', 'delivery'],
    children: [
      { name: "Orders", level: 2, path: "/orders/orders", icon: "assignment"},
    ]
  },
  // {
  //   name: "Report",
  //   icon: "account_circle",
  //   badge: { color: "secondary" },
  //   children: [
  //     { name: "Wholeseller Report", path: "/report/wholeseller-report", icon: "assignment"},
  //   ]
  // },
  {
    name: "Comissions",
    icon: "account_circle",
    badge: { color: "secondary" },
    allowedRoles: ["admin"],
    children: [
      { 
        name: "Comission Master", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/comissions/comission-master/create", iconText: "A" },
          { name: "View", path: "/comissions/comission-master/view", iconText: "A" },
        ] 
      },
      { name: "Platform Comission", level: 2, path: "/comissions/platform-comission", icon: "assignment"},
      { name: "Wage Cost Comission", level: 2, path: "/comissions/wage-cost-comission", icon: "assignment"},
      { 
        name: "Vehicle Master", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/comissions/vehicle-master/create", iconText: "A" },
          { name: "View", path: "/comissions/vehicle-master/view", iconText: "A" },
        ] 
      },
    ]
  },
  {
    name: "Frontend",
    icon: "account_circle",
    badge: { color: "secondary" },
    allowedRoles: ["admin"],
    children: [
      { 
        name: "Blogs", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/frontend/blogs/create", iconText: "A" },
          { name: "View", path: "/frontend/blogs/view", iconText: "A" },
        ] 
      },
      { 
        name: "Blog Category", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/frontend/blog-category/create", iconText: "A" },
          { name: "View", path: "/frontend/blog-category/view", iconText: "A" },
        ] 
      },
      { 
        name: "Special Offer", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/frontend/special-offer/create", iconText: "A" },
          { name: "View", path: "/frontend/special-offer/view", iconText: "A" },
        ] 
      },
    ]
  },
  {
    name: "Settings",
    icon: "account_circle",
    badge: { color: "secondary" },
    allowedRoles: ["admin",'wholesaler','retailer'],
    children: [
      { 
        name: "Offer", 
        icon: "apps",
        level: 2,
        allowedRoles: ["admin",'wholesaler','retailer'],
        children: [
          { name: "Create", path: "/settings/offer/create", iconText: "A" },
          { name: "View", path: "/settings/offer/view", iconText: "A" },
        ] 
      },
      { 
        name: "Coin Settings", 
        icon: "apps",
        level: 2,
        allowedRoles: ["admin",'wholesaler','retailer'],
        children: [
          { name: "Create", path: "/settings/coin-settings/create", iconText: "A" },
          { name: "View", path: "/settings/coin-settings/view", iconText: "A" },
        ] 
      },
      // { 
      //   name: "Coin Type", 
      //   icon: "apps",
      //   children: [
      //     { name: "Create", path: "/settings/coin-type/create", iconText: "A" },
      //     { name: "View", path: "/settings/coin-type/view", iconText: "A" },
      //   ] 
      // },
      { name: "Coin Details", path: "/settings/coin-details", iconText: "A",allowedRoles: ["admin",'wholesaler','retailer'], },
      { name: "Wallet Settings", path: "/settings/wallet-settings", iconText: "A", allowedRoles: ["admin",'wholesaler','retailer'], },
      { name: "Tax Slab", path: "/settings/tax-slab", iconText: "A" ,allowedRoles: ["admin"],},
      { 
        name: "Roles", 
        icon: "apps",
        level: 2,
        allowedRoles: ["admin"],
        children: [
          { name: "Create", path: "/settings/role/create", iconText: "A" },
          { name: "View", path: "/settings/role/view", iconText: "A" },
        ] 
      },
      { 
        name: "Add Staff", 
        icon: "apps",
        level: 2,
        allowedRoles: ["admin"],
        children: [
          { name: "Create", path: "/settings/staff/create", iconText: "A" },
          { name: "View", path: "/settings/staff/view", iconText: "A" },
        ] 
      },
      // { name: "Profile", level: 2, path: "/settings/profile", iconText: "A" },
    ]
  }
];

export default navigations;
