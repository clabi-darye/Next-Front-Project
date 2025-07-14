import { useEffect } from "react";
import { useFetchSetting } from "@/hooks/useHomeData";
import { useProjectInfoStore } from "@/store/useCommonStore";
import { saveIp } from "@/services/commonService";

export const useAppInitializer = () => {
  const { data: settingData } = useFetchSetting();

  useEffect(() => {
    saveIp();
  }, []);

  useEffect(() => {
    if (settingData) {
      useProjectInfoStore.getState().setInfo(settingData);
    }
  }, [settingData]);
};
