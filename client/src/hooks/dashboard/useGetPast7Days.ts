import axios from "axios";

export const useGetPast7Days = () => {
  const getPastSevenDaysSales = async () => {
    try {
      const salesData = await axios.get(
        "/api/order/dashboard/get-past-7days-sales"
      );

      return { status: 200, data: salesData.data };
    } catch (error) {
      console.log(error);
      return { status: 400 };
    }
  };

  return { getPastSevenDaysSales };
};
