import { differenceInSeconds } from "date-fns";

export const convertHexToRGB = (hex) => {
  // check if it's a rgba
  if (hex.match("rgba")) {
    let triplet = hex.slice(5).split(",").slice(0, -1).join(",");
    return triplet;
  }

  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");

    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
  }
};

export function getTimeDifference(date) {
  let difference = differenceInSeconds(new Date(), date);

  if (difference < 60) return `${Math.floor(difference)} sec`;
  else if (difference < 3600) return `${Math.floor(difference / 60)} min`;
  else if (difference < 86400) return `${Math.floor(difference / 3660)} h`;
  else if (difference < 86400 * 30) return `${Math.floor(difference / 86400)} d`;
  else if (difference < 86400 * 30 * 12) return `${Math.floor(difference / 86400 / 30)} mon`;
  else return `${(difference / 86400 / 30 / 12).toFixed(1)} y`;
}

export function filterNavigationByRole(navigations, userRoles) {
  const hasAccess = (item) => {
    // If item has no role restriction, include it
    if (!item.allowedRoles || item.allowedRoles.length === 0) return true;

    // If item.roles is defined, check if user has any matching role
    return item.allowedRoles.some(role => userRoles.includes(role));
  };

  const filterItems = (items) => {
    return items
      .filter(hasAccess)
      .map(item => ({
        ...item,
        children: item.children ? filterItems(item.children) : undefined,
      }))
      .filter(item => !(item.children && item.children.length === 0)); // Remove empty groups
  };

  return filterItems(navigations);
};

// // utils/routeHelpers.js
// import React from "react";
// import RoleGuard from "../auth/RoleGuard";

// export const wrapWithRoleGuard = (routes, defaultRoles = ["admin"]) => {
//   return routes.map((route) => {
//     let wrappedRoute = { ...route };

//     // Wrap the element only if it's defined (not a layout or grouping route)
//     if (route.element && !route.skipRoleGuard) {
//       wrappedRoute.element = (
//         <RoleGuard allowedRoles={route.allowedRoles || defaultRoles}>
//           {route.element}
//         </RoleGuard>
//       );
//     }

//     // Recursively apply to children
//     if (route.children) {
//       wrappedRoute.children = wrapWithRoleGuard(route.children, defaultRoles);
//     }

//     return wrappedRoute;
//   });
// };
