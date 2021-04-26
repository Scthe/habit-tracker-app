export type CurrentActiveElement =
  | "agenda"
  | "calendar"
  | "manage"
  | "me"
  | "create";

export type AppMenuItem = {
  id: CurrentActiveElement;
  to: string;
  icon: string;
  name: string;
};

export const ITEM_AGENDA: AppMenuItem = {
  id: "agenda",
  to: "/habits",
  icon: "calendar_view_day",
  name: "Agenda",
};

export const ITEM_CALENDAR: AppMenuItem = {
  id: "calendar",
  to: "/habits/calendar",
  icon: "calendar_today",
  name: "Calendar",
};

export const ITEM_MANAGE_HABITS: AppMenuItem = {
  id: "manage",
  to: "/habits/manage",
  icon: "settings", // view_list
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
  to: "/habits/create",
  icon: "add",
  name: "Add habit",
};
