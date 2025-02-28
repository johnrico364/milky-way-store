import { useEffect, useState } from "react";

export const useGetPast7Days = () => {
  const [date, setDates] = useState<string[]>([]);

  useEffect(() => {
    const getPastSevenDays = () => {
      const today = new Date();
      const pastSevenDays = [];
      for (let i = 6; i >= 0; i--) {
        const pastDate = new Date();
        pastDate.setDate(today.getDate() - i);
        const options: Intl.DateTimeFormatOptions = {
          month: "short",
          day: "numeric",
        };
        pastSevenDays.push(pastDate.toLocaleDateString("en-US", options));
      }
      return pastSevenDays;
    };
    
    setDates(getPastSevenDays().reverse());
  }, []);

  return [date];
};
