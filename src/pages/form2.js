import Asistentes from "../components/Asistentes";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import FormComplete from "../components/FormComplete";

const Page = () => {
  return (
    <>
      <Asistentes />
      <FormComplete/>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
