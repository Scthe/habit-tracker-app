import { ROUTES } from "pages/habits/constants";

export type CurrentActiveElement =
  | "agenda"
  | "calendar"
  | "manage"
  | "me"
  | "create"
  | "logout"
  | "hide-drawer"
  | "toggle-color-theme"
  | "github";

export type AppMenuItem = {
  id: CurrentActiveElement;
  to?: string;
  onClick?: () => void;
  icon: string;
  svgIcon?: React.ReactElement;
  name: string;
};

export const ITEM_AGENDA: AppMenuItem = {
  id: "agenda",
  to: ROUTES.agenda,
  icon: "star",
  name: "Agenda",
};

export const ITEM_CALENDAR: AppMenuItem = {
  id: "calendar",
  to: ROUTES.calendar,
  icon: "calendar_today",
  name: "Calendar",
};

export const ITEM_MANAGE_HABITS: AppMenuItem = {
  id: "manage",
  to: ROUTES.manage,
  icon: "view_list",
  name: "Manage",
};

export const ITEM_ME: AppMenuItem = {
  id: "me",
  to: "/me",
  icon: "person",
  name: "Account",
};

export const ITEM_CREATE_HABIT: AppMenuItem = {
  id: "create",
  to: ROUTES.create,
  icon: "add",
  name: "Add habit",
};
