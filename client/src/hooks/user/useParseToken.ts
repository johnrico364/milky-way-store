import axios from "axios";

export const useParseToken = () => {
  const userToken = JSON.parse(
    localStorage.getItem("user") || `{"token":"null"}`
  );

  const parseToken = async () => {
    try {
      const userData = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/user/user-data/${userToken.token}`
      );
      return userData?.data?.user;
    } catch (error) {
      console.log(error);
    }
  };

  return { parseToken };
};
