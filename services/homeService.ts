import { apiClient } from "@/services/common/apiClient";
import { Filter } from "@/types/Filter";

export const fetchFilters = async (params?: {
  year?: string;
  search?: string;
}): Promise<Filter[]> => {
  return apiClient(`/filter`, {
    method: "GET",
  });
};
