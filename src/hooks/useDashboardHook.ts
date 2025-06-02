import { homePageApi } from "@/api/dashboardApi";
import { useQuery } from "@tanstack/react-query";

const useHomepageData = ()  => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['homepageData'],
        queryFn: () => homePageApi.getHomePageData(),
    });
    return { data, isLoading, error };
};

export const useDashboardHook = {
  useHomepageData,
};
