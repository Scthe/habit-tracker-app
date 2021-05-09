import { HabitStatus } from "../../_types";
import { useLoggedUser } from "~storage";

type SetHabitDoneArg = Omit<HabitStatus, "userId">;
export type SetHabitDoneFn = (date: SetHabitDoneArg) => Promise<HabitStatus>;

// TODO the async lib had some nice helper here
/*
const setStatus = async (data: SetHabitDoneArg, user) => {
  const nextStatus: HabitStatus = {
    ...data,
    userId: user.uid,
  };
  console.log("Set habit status", nextStatus);
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, nextStatus), 5000)
  });
}
*/

export const useSetHabitDone = (): SetHabitDoneFn => {
  const user = useLoggedUser();
  // return useAsyncCallback();

  return (data: SetHabitDoneArg) => {
    const nextStatus: HabitStatus = {
      ...data,
      userId: user.uid,
    };
    console.log("Set habit status", nextStatus);
    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, nextStatus), 5000);
    });
  };
};
