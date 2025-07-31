import { apiClient } from "./apiClient";
import { Filter } from "@/types/Filter";

export const fetchFilters = async (params?: {
  year?: string;
  search?: string;
}): Promise<Filter[]> => {
  return apiClient(`/chat/filter/tree`, {
    method: "GET",
    data: params,
  });
};
