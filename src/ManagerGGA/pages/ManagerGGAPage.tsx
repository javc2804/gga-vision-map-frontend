import { Typography } from "@mui/material";
import ManagerGGALayout from "../layout/ManagerGGALayout";
import RegisterPurchase from "../view/RegisterPurchase";

export const ManagerGGAPage = () => {
  return (
    <ManagerGGALayout>
      {/* <Typography>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
        pariatur mollitia ab iusto ut deserunt suscipit itaque maiores quas nemo
        aliquam dolor, eum enim provident aperiam quibusdam exercitationem error
        laboriosam.
      </Typography> */}
      {/* NothungSelected*/}
      <RegisterPurchase />
      <div></div>
    </ManagerGGALayout>
  );
};

export default ManagerGGAPage;
