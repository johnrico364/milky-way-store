import axios from "axios";

export const useGetDashboardSummary = () => {
  const getDashboardSummary = async () => {
    try {
      const summary = await axios.get(`${process.env.REACT_APP_BACKEND_BASEURL}/api/order/get/dashboard-summary`);
      return summary.data;
    } catch (error) {}
  };

  return { getDashboardSummary };
};
