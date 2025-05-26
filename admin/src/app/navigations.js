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
    children: [
      { 
        name: "APMC", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/features/apmc/create", iconText: "A"},
          { name: "List", path: "/features/apmc/list", iconText: "A" },
        ] 
      },
      { 
        name: "Product Master", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/features/product/create", iconText: "A" },
          { name: "List", path: "/features/product/list", iconText: "A" },
        ] 
      },
      { 
        name: "Category", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/features/category/create", iconText: "A" },
          { name: "List", path: "/features/category/list", iconText: "A" },
        ] 
      },
      { name: "Product Reviews", path: "/features/product/reviews", icon: "assignment"},
    ]
  },
  {
    name: "WholeSaler",
    icon: "account_circle",
    badge: { color: "secondary" },
    
    children: [
      { 
        name: "WholeSaler User", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/features/wholesaler/create", iconText: "A" },
          { name: "List", path: "/features/wholesaler/list", iconText: "A" },
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
    
    children: [
      { 
        name: "Retailer User", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/features/retailer/create", iconText: "A" },
          { name: "List", path: "/features/retailer/list", iconText: "A" },
        ] 
      },
      { name: "Retailer KYC", level: 2, path: "/retailer/retailer-kyc", icon: "assignment" },
    ]
  },
  {
    name: "Delivery",
    icon: "account_circle",
    badge: { color: "secondary" },
    
    children: [
      { 
        name: "Delivery User", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/features/delivery/create", iconText: "A" },
          { name: "List", path: "/features/delivery/list", iconText: "A" },
        ] 
      },
      { name: "Delivery KYC", level: 2, path: "/delivery/delivery-kyc", icon: "assignment" },
    ]
  },
  {
    name: "Orders",
    icon: "account_circle",
    badge: { color: "secondary" },
    
    children: [
      { name: "All Orders", level: 2, path: "/orders/orders", icon: "assignment"},
      { name: "Accepted Orders", level: 2, path: "/orders/accepted-orders", icon: "assignment"},
      { name: "Delivered Orders", level: 2, path: "/orders/delivered-orders", icon: "assignment"},
    ]
  },

  {
    name: "Commissions",
    icon: "account_circle",
    badge: { color: "secondary" },
   
    children: [
      { 
        name: "Vehicle Commission", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/commissions/vehicle-commission/create", iconText: "A" },
          { name: "List", path: "/commissions/vehicle-commission/list", iconText: "A" },
        ] 
      },
      { name: "Platform Comission", level: 2, path: "/commissions/platform-commission", icon: "assignment"},
      { name: "Wage Cost Comission", level: 2, path: "/commissions/wage-cost-commission", icon: "assignment"},
      { 
        name: "Vehicle Types", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/comissions/vehicle-type/create", iconText: "A" },
          { name: "List", path: "/comissions/vehicle-type/list", iconText: "A" },
        ] 
      },
    ]
  },
  {
    name: "Frontend",
    icon: "account_circle",
    badge: { color: "secondary" },
   
    children: [
      { 
        name: "Blogs", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/frontend/blogs/create", iconText: "A" },
          { name: "List", path: "/frontend/blogs/list", iconText: "A" },
        ] 
      },
      { 
        name: "Blog Category", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/frontend/blog-category/create", iconText: "A" },
          { name: "List", path: "/frontend/blog-category/list", iconText: "A" },
        ] 
      },
      { 
        name: "Special Offer", 
        icon: "apps",
        level: 2,
        children: [
          { name: "Create", path: "/frontend/special-offer/create", iconText: "A" },
          { name: "List", path: "/frontend/special-offer/list", iconText: "A" },
        ] 
      },
    ]
  },
  {
    name: "Settings",
    icon: "account_circle",
    badge: { color: "secondary" },
    
    children: [
      { 
        name: "Offer", 
        icon: "apps",
        level: 2,
       
        children: [
          { name: "Create", path: "/settings/offer/create", iconText: "A" },
          { name: "List", path: "/settings/offer/list", iconText: "A" },
        ] 
      },
      { 
        name: "Coin Settings", 
        icon: "apps",
        level: 2,
       
        children: [
          { name: "Create", path: "/settings/coin-settings/create", iconText: "A" },
          { name: "List", path: "/settings/coin-settings/list", iconText: "A" },
        ] 
      },
   
      { name: "Purchased Coins", path: "/settings/purchased-coins", iconText: "A", },
      { name: "Tax Slab", path: "/settings/tax-slab", iconText: "A" ,},
      { 
        name: "Roles", 
        icon: "apps",
        level: 2,
        
        children: [
          { name: "Create", path: "/settings/role/create", iconText: "A" },
          { name: "List", path: "/settings/role/list", iconText: "A" },
        ] 
      },
      { 
        name: "Add Staff", 
        icon: "apps",
        level: 2,
        
        children: [
          { name: "Create", path: "/settings/staff/create", iconText: "A" },
          { name: "List", path: "/settings/staff/list", iconText: "A" },
        ] 
      },
      
    ]
  },
  {
    name: "Coin",
    icon: "account_circle",
    badge: { color: "secondary" },
   
    children: [
      { name: "Purchased Coins", path: "/settings/purchased-coins", iconText: "A" },
      { name: "Purchase Coin", path: "/settings/purchase-coin", iconText: "A"  },
    ]
  },
  {
    name: "Wallet",
    icon: "account_circle",
    badge: { color: "secondary" },
    
    children: [
      { name: "Wallet Settings", path: "/settings/wallet-settings", iconText: "A" },
    ]
  }
];

export default navigations;
