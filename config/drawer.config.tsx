import SearchIcon from "@mui/icons-material/Search";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
// Drawer 전역 설정 값
export const drawerConfig = {
  drawerWidth: 240, // drawer 너비(px)
  showLogo: false, // 로고 표시 여부
  activeMenu: ["chat", "history", "filter"], // 표시할 메뉴 key 값들
};

export const drawerMenuList: {
  key: string;
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  type: string;
  link: string;
}[] = [
  {
    key: "home",
    title: "홈",
    icon: SearchIcon,
    type: "menu",
    link: "/",
  },
];
