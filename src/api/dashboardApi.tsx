import axiosClient from "./axiosClient";
import { ResponseData } from "../utils/type";
import { HomepageData } from "../dataHelper/dashboard.dataHelper";
export const homePageApi = {
  getHomePageData: (): Promise<ResponseData<HomepageData>> =>
    axiosClient.get("/dashboard/homepage"),
};
