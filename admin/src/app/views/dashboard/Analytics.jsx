import { Fragment } from "react";
import Grid from "@mui/material/Grid2";
import { styled, useTheme } from "@mui/material/styles";
import AdminStatCards from "./shared/AdminStatCards";
import WholesalerStatCard from "./shared/WholesalerStatCard";
import RetailerStatCard from "./shared/RetailerStatCard";
import useAuth from "app/hooks/useAuth";
// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "2rem",
  [theme.breakpoints.down("sm")]: { margin: "1rem" }
}));

export default function Analytics() {
  const { user } = useAuth();
  const userRoleSlug = user?.roles?.[0]?.slug;

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid size={{ md: 8, xs: 12 }}>
            {userRoleSlug === "admin" && <AdminStatCards />}
            {userRoleSlug === "wholesaler" && <WholesalerStatCard />}
            {userRoleSlug === "retailer" && <RetailerStatCard />}
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
}
