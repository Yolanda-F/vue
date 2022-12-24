import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage, ElLoading } from "element-plus";
import { showMessage } from "./status";
import { useStore } from "@/store/index";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: window.CONFIG.baseURL,
});
const store = useStore();

let loadingInstance; //loading实例
const requestList: requestType[] = []; //请求数组

//关闭loading
function closeLoading(error = null) {
  if (loadingInstance) {
    loadingInstance.close();
  }
  if (error) {
    ElMessage.error(`请求失败：${error}`);
  }
}
//清除添加的延迟
function clearTimeList(url: string | undefined) {
  if (url) {
    const index = requestList.findIndex((d) => d.url == url);
    if (index != -1) {
      clearTimeout(requestList[index].timeId);
      requestList.splice(index, 1);
    }
  }
}

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 请求前添加loading
    const timeId = setTimeout(() => {
      loadingInstance = ElLoading.service({
        fullscreen: true,
        text: "",
      });
    }, 200);
    //记录添加loading的url
    requestList.push({
      url: config.url,
      timeId: timeId,
    });
    //添加token
    if (store.token && config.headers) {
      config.headers.Authorization = `${store.token}`;
    }
    return config;
  },
  (error) => {
    clearTimeList(error.config.url);
    closeLoading(error);
    console.log(error);
    return Promise.reject(error);
  }
);
// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    clearTimeList(response.config.url);
    closeLoading();
    if (response.status === 200) {
      //   console.log("-----", response);
      return response.data;
    }
    ElMessage.error(showMessage(response.status));
    return response;
  },
  // 请求失败
  (error) => {
    clearTimeList(error.config.url);
    closeLoading(error);
    console.log(error);
    return Promise.reject(error);
  }
);

const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config;
  return new Promise((resolve) => {
    axiosInstance
      .request<any, AxiosResponse<IResponse>>(conf)
      .then((res: AxiosResponse<IResponse>) => {
        const { data } = res;
        resolve(data as unknown as Promise<T>);
        // console.log(data);
        // resolve(data);
      });
  });
};

export function get<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: "GET" });
}

export function post<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: "POST" });
}

export function Delete<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: "DELETE" });
}

export default request;
export type { AxiosInstance, AxiosResponse };
