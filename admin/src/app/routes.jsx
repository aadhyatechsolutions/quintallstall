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

import ProductView from "../features/product/ProductView";
import ProductCreate from "../features/product/ProductCreate";
import ProductEdit from "../features/product/ProductEdit";

import CategoryCreate from "../features/category/CategoryCreate";
import CategoryView from "../features/category/CategoryView";
import CategoryEdit from "../features/category/CategoryEdit";

import WholeSalerCreate from "../features/wholesaler/WholesalerCreate";
import WholeSalerView from "../features/wholesaler/WholesalerView";
import WholeSalerEdit from "../features/wholesaler/WholesalerEdit";
import WholeSalerProductView from "../features/wholesaler/WholesalerProductView";

import WholeSellerKYCList from "./components/WholeSeller/WholeSellerKYCList";

import ProductList from "./components/WholeSeller/ProductList";

import RetailerCreate from "./components/Retailer/RetailerUser/Create";
import RetailerView from "./components/Retailer/RetailerUser/View";
import RetailerKYCList from "./components/Retailer/RetailerKYCList";

import DeliveryCreate from "./components/Delivery/DeliveryUser/Create";
import DeliveryView from "./components/Delivery/DeliveryUser/View";
import DeliveryEdit from "./components/Delivery/DeliveryUser/Edit";

import Orders from "./components/Orders/Orders";
import Reviews from "./components/Orders/Reviews";

import WholeSellerReport from "./components/Report/WholeSellerReport";

import ComissionMasterCreate from "./components/Comissions/ComissionMaster/Create";
import ComissionMasterView from "./components/Comissions/ComissionMaster/View";
import ComissionMasterEdit from "./components/Comissions/ComissionMaster/Edit";

import PlatformComission from "./components/Comissions/PlatformComission";
import WageCostComission from "./components/Comissions/WageCostComission";

import VehicleMasterCreate from "./components/Comissions/VehicleMaster/Create";
import VehicleMasterView from "./components/Comissions/VehicleMaster/View";
import VehicleMasterEdit from "./components/Comissions/VehicleMaster/Edit";

import BlogCreate from "./components/Frontend/Blogs/Create";
import BlogView from "./components/Frontend/Blogs/View";

import BlogCategoryCreate from "./components/Frontend/BlogCategory/Create";
import BlogCategoryView from "./components/Frontend/BlogCategory/View";
import BlogCategoryEdit from "./components/Frontend/BlogCategory/Edit";

import SpecialOfferCreate from "./components/Frontend/SpecialOffer/Create";
import SpecialOfferView from "./components/Frontend/SpecialOffer/View";
import SpecialOfferEdit from "./components/Frontend/SpecialOffer/Edit";

import CoinSettingsCreate from "./components/Settings/CoinSettings/Create";
import CoinSettingsView from "./components/Settings/CoinSettings/View";
import CoinSettingsEdit from "./components/Settings/CoinSettings/Edit";

import CoinTypeCreate from "./components/Settings/CoinType/Create";
import CoinTypeView from "./components/Settings/CoinType/View";
import CoinTypeEdit from "./components/Settings/CoinType/Edit";

import CoinDetails from "./components/Settings/CoinDetails";
import WalletSettings from "./components/Settings/WalletSettings";
import TaxSlabCreate from "./components/Settings/TaxSlabCreate";

import RoleCreate from "./components/Settings/Roles/Create";
import RoleEdit from "./components/Settings/Roles/Edit";
import RoleView from "./components/Settings/Roles/View";

import StaffCreate from "./components/Settings/Staff/Create";
import StaffEdit from "./components/Settings/Staff/Edit";
import StaffView from "./components/Settings/Staff/View";

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
      { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin, },

      { path: "/features/apmc/view", element: <AMPCView /> },
      { path: "/features/apmc/create", element: <AMPCCreate /> },
      { path: "/features/apmc/edit/:id", element: <AMPCEdit /> },

      { path: "/features/product/view", element: <ProductView /> },
      { path: "/features/product/create", element: <ProductCreate />, },
      { path: "/features/product/edit/:id", element: <ProductEdit />,},

      { path: "/features/category/view", element: <CategoryView /> },
      { path: "/features/category/create", element: <CategoryCreate /> },
      { path: "/features/category/edit/:id", element: <CategoryEdit /> },

      { path: "/features/wholesaler/create", element: <WholeSalerCreate />, },
      { path: "/features/wholesaler/view", element: <WholeSalerView />, },
      { path: "/features/wholesaler/edit/:id", element: <WholeSalerEdit />, },

      { path: "/wholesaler/view-products", element: <WholeSalerProductView /> },
      { path: "/wholeseller/wholeseller-kyc", element: <WholeSellerKYCList /> },

      { path: "/retailer/retailer-user/create", element: <RetailerCreate /> },
      { path: "/retailer/retailer-user/view", element: <RetailerView /> },
      { path: "/retailer/retailer-kyc", element: <RetailerKYCList /> },

      { path: "/delivery/delivery-user/create", element: <DeliveryCreate /> },
      { path: "/delivery/delivery-user/view", element: <DeliveryView /> },
      { path: "/delivery/delivery-user/edit/:id", element: <DeliveryEdit /> },

      { path: "/orders/orders", element: <Orders /> },
      { path: "/orders/reviews", element: <Reviews /> },

      { path: "/report/wholeseller-report", element: <WholeSellerReport /> },

      { path: "/comissions/comission-master/create", element: <ComissionMasterCreate />, },
      { path: "/comissions/comission-master/view", element: <ComissionMasterView />, },
      { path: "/comissions/comission-master/edit/:id", element: <ComissionMasterEdit />, },

      { path: "/comissions/platform-comission", element: <PlatformComission />, },
      { path: "/comissions/wage-cost-comission", element: <WageCostComission />, },

      { path: "/comissions/vehicle-master/create", element: <VehicleMasterCreate />, },
      { path: "/comissions/vehicle-master/view", element: <VehicleMasterView />, },
      { path: "/comissions/vehicle-master/edit/:id", element: <VehicleMasterEdit />, },

      { path: "/frontend/blogs/create", element: <BlogCreate /> },
      { path: "/frontend/blogs/view", element: <BlogView /> },

      { path: "/frontend/blog-category/create", element: <BlogCategoryCreate />, },
      { path: "/frontend/blog-category/view", element: <BlogCategoryView /> },
      { path: "/frontend/blog-category/edit/:id", element: <BlogCategoryEdit />, },

      { path: "/frontend/special-offer/create", element: <SpecialOfferCreate />, },
      { path: "/frontend/special-offer/view", element: <SpecialOfferView /> },
      { path: "/frontend/special-offer/edit/:id", element: <SpecialOfferEdit />, },

      { path: "/settings/coin-settings/create", element: <CoinSettingsCreate />, },
      { path: "/settings/coin-settings/view", element: <CoinSettingsView /> },
      { path: "/settings/coin-settings/edit/:id", element: <CoinSettingsEdit />, },

      { path: "/settings/coin-type/create", element: <CoinTypeCreate /> },
      { path: "/settings/coin-type/view", element: <CoinTypeView /> },
      { path: "/settings/coin-type/edit/:id", element: <CoinTypeEdit /> },

      { path: "/settings/coin-details", element: <CoinDetails /> },
      { path: "/settings/wallet-settings", element: <WalletSettings /> },
      { path: "/settings/tax-slab", element: <TaxSlabCreate /> },

      { path: "/settings/roles/create", element: <RoleCreate /> },
      { path: "/settings/roles/view", element: <RoleView /> },
      { path: "/settings/roles/edit/:id", element: <RoleEdit /> },

      { path: "/settings/staff/create", element: <StaffCreate /> },
      { path: "/settings/staff/view", element: <StaffView /> },
      { path: "/settings/staff/edit/:id", element: <StaffEdit /> },
    ],
  },
  ...sessionRoutes,
];

export default routes;
