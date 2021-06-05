import once from "lodash/once";
import { getAnalytics, logEvent } from "firebase/analytics";

import { __getFirebaseApp } from "./firebaseApp";
import { HabitCompletionStatus } from "pages/habits/_types";
import {
  DayOfYear,
  deconstructDate,
  MonthOfYear,
  relativeToToday,
} from "utils/date";
import { ThemeColor } from "theme";

// TODO check imports, them might be too broad for landing/login page

type EventParams = Record<string, string>;

export const logSimpleEvent = (
  name: string,
  params: EventParams = {}
): void => {
  const finalParams = {
    ...params,
    build: NODE_ENV,
    page_host: window.location.host,
    page_location: `${window.location.origin}${window.location.pathname}`,
  };

  if (NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(`EVENT '${name}'`, finalParams);
  } else {
    const app = __getFirebaseApp();
    if (app != null) {
      // TODO test me!
      logEvent(getAnalytics(app), name, params);
    } else {
      // TODO sentry me!
      console.error("Not init yet?");
    }
  }
};

// TODO use
export const logLogin = (provider: string, params: EventParams = {}): void => {
  logSimpleEvent("login", { ...params, provider });
};

export const logLogout = (params: EventParams = {}): void => {
  logSimpleEvent("logout", params);
};

// TODO use
export const logSignup = (provider: string, params: EventParams = {}): void => {
  logSimpleEvent("sign_up", { ...params, provider });
};

const logAppLoadedImpl = (
  theme: ThemeColor,
  params: EventParams = {}
): void => {
  logSimpleEvent("app_loaded", { ...params, theme });
};
export const logAppLoaded: typeof logAppLoadedImpl = once(logAppLoadedImpl);

export const logPageView = (
  pageData: {
    theme: ThemeColor;
    pathname: string;
  },
  params: EventParams = {}
): void => {
  logSimpleEvent("page_view", {
    ...params,
    page_path: pageData.pathname,
    theme: pageData.theme,
  });
};

export const logError = (
  type: string,
  error: Error,
  params: EventParams = {}
): void => {
  logSimpleEvent("error", { ...params, type, message: error.message });
};

// TODO finish
export const logApiError = (
  requestData: {
    name: string;
  },
  error: Error,
  params: EventParams = {}
): void => {
  logSimpleEvent("api_error", {
    ...params,
    ...requestData,
    message: error.message,
  });
};

export const logDayEvent = (
  name: string,
  day: DayOfYear,
  params: EventParams = {}
): void => {
  const today = deconstructDate(new Date());
  logSimpleEvent(name, {
    ...params,
    relativeToToday: relativeToToday(day),
    currentMonth: String(today.month === day.month && today.year === day.year),
  });
};

export const logMonthEvent = (
  name: string,
  month: MonthOfYear,
  params: EventParams = {}
): void => {
  const today = deconstructDate(new Date());
  const day: DayOfYear = { ...month, day: today.day };
  logSimpleEvent(name, {
    ...params,
    relativeToToday: relativeToToday(day),
  });
};

export const logHabitStatusChange = (
  screen: "agenda" | "details",
  nextStatus: HabitCompletionStatus,
  params: EventParams = {}
): void => {
  logSimpleEvent("habit_set_status", { ...params, screen, nextStatus });
};
