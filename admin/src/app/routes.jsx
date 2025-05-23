import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import sessionRoutes from "./views/sessions/session-routes";
import materialRoutes from "app/views/material-kit/MaterialRoutes";

import AMPCView from "../features/apmc/ApmcView";
import AMPCCreate from "../features/apmc/ApmcCreate";
import AMPCEdit from "../features/apmc/ApmcEdit";

import ProductList from "../features/product/ProductList";
import ProductCreate from "../features/product/ProductCreate";
import ProductEdit from "../features/product/ProductEdit";
import ProductView from "../features/product/ProductView";
import ProductReview from "../features/product/ProductReview";

import CategoryCreate from "../features/category/CategoryCreate";
import CategoryView from "../features/category/CategoryView";
import CategoryEdit from "../features/category/CategoryEdit";

import WholeSalerCreate from "../features/wholesaler/WholesalerCreate";
import WholeSalerView from "../features/wholesaler/WholesalerView";
import WholeSalerEdit from "../features/wholesaler/WholesalerEdit";
import WholeSalerProductView from "../features/wholesaler/WholesalerProductView";
import WholeSalerKYC from "../features/wholesaler/WholesalerKYC";

// import ProductList from "./components/WholeSeller/ProductList";

import RetailerCreate from "../features/retailer/RetailerCreate";
import RetailerView from "../features/retailer/RetailerView";
import RetailerEdit from "../features/retailer/RetailerEdit";
import RetailerProductView from "../features/retailer/RetailerProductView";
import RetailerKYC from "../features/retailer/RetailerKYC";

import DeliveryCreate from "../features/delivery/DeliveryCreate";
import DeliveryView from "../features/delivery/DeliveryView";
import DeliveryEdit from "../features/delivery/DeliveryEdit";
import DeliveryKYC from "../features/delivery/DeliveryKYC";

import OrderView from "../features/order/OrderView";
import AcceptedOrders from "../features/order/AcceptedOrders";
import DeliveredOrders from "../features/order/DeliveredOrders";
import OrderMap from "../features/order/OrderMap";
import Reviews from "./components/Orders/Reviews";

import WholeSellerReport from "./components/Report/WholeSellerReport";

import VehicleCommissionCreate from "../features/commission/VehicleCommissionCreate";
import VehicleCommissionView from "../features/commission/VehicleCommissionView";
import VehicleCommissionEdit from "../features/commission/VehicleCommissionEdit";

import PlatformComission from "../features/commission/PlatformCommission";
import WageCostCommission from "../features/commission/WageCostCommission";

import VehicleTypeCreate from "../features/vehicleType/VehicleTypeCreate";
import VehicleTypeView from "../features/vehicleType/VehicleTypeView";
import VehicleTypeEdit from "../features/vehicleType/VehicleTypeEdit";

import BlogCreate from "../features/blog/BlogCreate";
import BlogEdit from "../features/blog/BlogEdit";
import BlogView from "../features/blog/BlogView";

import BlogCategoryCreate from "../features/blogCategory/BlogCategoryCreate";
import BlogCategoryView from "../features/blogCategory/BlogCategoryView";
import BlogCategoryEdit from "../features/blogCategory/BlogCategoryEdit";

import SpecialOfferCreate from "../features/specialOffer/SpecialOfferCreate";
import SpecialOfferView from "../features/specialOffer/SpecialOfferView";
import SpecialOfferEdit from "../features/specialOffer/SpecialOfferEdit";

import CoinCreate from "../features/coin/CoinCreate";
import CoinView from "../features/coin/CoinView";
import CoinEdit from "../features/coin/CoinEdit";

import ProfileEdit from "../features/profile/ProfileEdit";

// import CoinTypeCreate from "./components/Settings/CoinType/Create";
// import CoinTypeView from "./components/Settings/CoinType/View";
// import CoinTypeEdit from "./components/Settings/CoinType/Edit";

// import CoinDetails from "./components/Settings/CoinDetails";
import PurchasedCoins from "../features/coin/PurchasedCoins";
import PurchaseCoin from "../features/coin/PurchaseCoin";
import WalletSettings from "../features/wallet/WalletSettings";
// import TaxSlabCreate from "./components/Settings/TaxSlabCreate";
import TaxSlab from "../features/tax/TaxSlab";
import RoleCreate from "../features/role/RoleCreate";
import RoleEdit from "../features/role/RoleEdit";
import RoleView from "../features/role/RoleView";

import StaffCreate from "../features/staff/StaffCreate";
import StaffEdit from "../features/staff/StaffEdit";
// import StaffEdit from "./components/Settings/Staff/Edit";
import StaffView from "../features/staff/StaffView";

import RoleGuard from "./auth/RoleGuard";

const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));

const routes = [

  { path: "/", element: <Navigate to="/dashboard/default" /> },
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      { path: "/dashboard/default", element:  <Analytics />, auth: authRoles.admin, },

      { path: "/features/apmc/view", element: <AMPCView /> },
      { path: "/features/apmc/create", element: <AMPCCreate /> },
      { path: "/features/apmc/edit/:id", element: <AMPCEdit /> },

      { path: "/features/product/list", element: <ProductList /> },
      { path: "/features/product/create", element: <ProductCreate />, },
      { path: "/features/product/view/:id", element: <ProductView />,},
      { path: "/features/product/edit/:id", element: <ProductEdit />,},
      { path: "/features/product/reviews", element: <ProductReview />,},

      { path: "/features/category/view", element: <CategoryView /> },
      { path: "/features/category/create", element: <CategoryCreate /> },
      { path: "/features/category/edit/:id", element: <CategoryEdit /> },

      { path: "/features/wholesaler/create", element: <WholeSalerCreate />, },
      { path: "/features/wholesaler/view", element: <WholeSalerView />, },
      { path: "/features/wholesaler/edit/:id", element: <WholeSalerEdit />, },

      { path: "/wholesaler/view-products", element: <WholeSalerProductView /> },
      { path: "/wholesaler/wholesaler-kyc", element: <WholeSalerKYC /> },

      { path: "/features/retailer/create", element: <RetailerCreate /> },
      { path: "/features/retailer/view", element: <RetailerView /> },
      { path: "/features/retailer/edit/:id", element: <RetailerEdit /> },

      { path: "/retailer/view-products", element: <RetailerProductView /> },
      { path: "/retailer/retailer-kyc", element: <RetailerKYC /> },

      { path: "/features/delivery/create", element: <DeliveryCreate /> },
      { path: "/features/delivery/view", element: <DeliveryView /> },
      { path: "/features/delivery/edit/:id", element: <DeliveryEdit /> },

      { path: "/delivery/delivery-kyc", element: <DeliveryKYC /> },

      { path: "/orders/orders", element: <OrderView /> },
      { path: "/orders/accepted-orders", element: <AcceptedOrders /> },
      { path: "/orders/delivered-orders", element: <DeliveredOrders /> },
      { path: "/orders/order-map", element: <OrderMap /> },

      { path: "/report/wholeseller-report", element: <WholeSellerReport /> },

      { path: "/commissions/vehicle-commission/create", element: <VehicleCommissionCreate />, },
      { path: "/commissions/vehicle-commission/view", element: <VehicleCommissionView />, },
      { path: "/commissions/vehicle-commission/edit/:id", element: <VehicleCommissionEdit />, },

      { path: "/commissions/platform-commission", element: <PlatformComission />, },
      { path: "/commissions/wage-cost-commission", element: <WageCostCommission />, },

      { path: "/comissions/vehicle-type/create", element: <VehicleTypeCreate />, },
      { path: "/comissions/vehicle-type/view", element: <VehicleTypeView />, },
      { path: "/comissions/vehicle-type/edit/:id", element: <VehicleTypeEdit />, },

      { path: "/frontend/blogs/create", element: <BlogCreate /> },
       { path: "/frontend/blogs/edit/:id", element: <BlogEdit /> },
      { path: "/frontend/blogs/view", element: <BlogView /> },

      { path: "/frontend/blog-category/create", element: <BlogCategoryCreate />, },
      { path: "/frontend/blog-category/view", element: <BlogCategoryView /> },
      { path: "/frontend/blog-category/edit/:id", element: <BlogCategoryEdit />, },

      { path: "/frontend/special-offer/create", element: <SpecialOfferCreate />, },
      { path: "/frontend/special-offer/view", element: <SpecialOfferView /> },
      { path: "/frontend/special-offer/edit/:id", element: <SpecialOfferEdit />, },

      { path: "/settings/coin-settings/create", element: <CoinCreate />, },
      { path: "/settings/coin-settings/view", element: <CoinView /> },
      { path: "/settings/coin-settings/edit/:id", element: <CoinEdit />, },

      // { path: "/settings/coin-type/create", element: <CoinTypeCreate /> },
      // { path: "/settings/coin-type/view", element: <CoinTypeView /> },
      // { path: "/settings/coin-type/edit/:id", element: <CoinTypeEdit /> },

      { path: "/settings/purchased-coins", element: <PurchasedCoins /> },
      { path: "/settings/purchase-coin", element: <PurchaseCoin /> },
      
      
      { path: "/settings/wallet-settings", element: <WalletSettings /> },
      { path: "/settings/tax-slab", element: <TaxSlab /> },

      { path: "/settings/role/create", element: <RoleCreate /> },
      { path: "/settings/role/view", element: <RoleView /> },
      { path: "/settings/role/edit/:id", element: <RoleEdit /> },

      { path: "/settings/staff/create", element: <StaffCreate /> },
      { path: "/settings/staff/view", element: <StaffView /> },
      { path: "/settings/staff/edit/:id", element: <StaffEdit /> },

      { path: "/page-layouts/user-profile", element: <ProfileEdit /> },
      
    ],
  },
  ...sessionRoutes,
];

export default routes;
