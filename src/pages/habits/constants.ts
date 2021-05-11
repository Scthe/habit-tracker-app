import { useLocation } from "react-router-dom";
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

export const routeDetails = (id: string): string => `/habits/${id}/details`;

type HabitLocation = Partial<ReturnType<typeof useLocation>>;

export const routeEdit = (habit: Habit): HabitLocation => ({
  pathname: `/habits/${habit.id}/edit`,
  state: habit,
});
