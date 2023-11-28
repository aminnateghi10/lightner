import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const callApi = () => {
  const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.105'
  })
  axiosInstance.interceptors.request.use(
    async (config) => {
      config.withCredentials = false;
      const token = await AsyncStorage.getItem('token');
      config.headers.Authorization = token;
      return config
    },
    err => {
      throw err
    }
  )
  axiosInstance.interceptors.response.use(
    (res) => {
      return res
    },
    err => {
      const res = err?.response
      if (res) {
        if (res.status = 422) {
          // throw new ValidationError(res.data);
        }
      }
      {
        throw err
      }
    }
  )

  return axiosInstance;
}

export default callApi;
