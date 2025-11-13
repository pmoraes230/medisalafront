import { useQuery } from "@tanstack/react-query";
import { dataDashboardApi } from "../services/dashboardApi";
import type { DashboardData } from "../types/DashboardData";

export const useDashboardData = () => {
    return useQuery<DashboardData>({
        queryKey: ['dashboard'],
        queryFn: dataDashboardApi.getData,
    });
}