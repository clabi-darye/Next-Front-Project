export interface DrawerItem {
  id: number;
  key: string;
  title: string;
  type: "menu" | "button" | "toggle";
  icon?: React.ElementType;
  link?: string;
  subList?: React.ReactNode;
}
