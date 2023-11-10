import axios from "axios";

const callApi = () => {
  const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.102'
  })
  axiosInstance.interceptors.request.use(
    (config) => {
      config.withCredentials = true;
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
