import { Habit } from "./_types";

export const ROUTES = {
  base: "/habits",
  agenda: "/habits/agenda",
  calendar: "/habits/calendar",
  manage: "/habits/manage",
  create: "/habits/create",
  edit: "/habits/:id/edit",
  details: "/habits/:id/details",
};

export const routeDetails = (id: string) => `/habits/${id}/details`;
export const routeEdit = (habit: Habit) => ({
  pathname: `/habits/${habit.id}/details`,
  state: habit,
});