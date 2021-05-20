import React from "react";

import { AccountHeader } from "./AccountHeader";
import { AccountFields } from "./AccountFields";
import { AppPageContent } from "pages/_shared";
import { useLoggedUser } from "~storage";
import { Weekday } from "~utils";

interface Props {
  className?: string;
}

const UserDetailsFragment: React.FC<Props> = ({ className }) => {
  const user = useLoggedUser();

  return (
    <>
      <AccountHeader />

      {/* {...adaptAsyncDataForContent(asyncData, "Could not load habit")} */}
      <AppPageContent className={className}>
        <AccountFields
          user={user}
          userSettings={{
            firstDayOfWeek: Weekday.Monday,
            clockDisplay: "12h",
          }}
        />
      </AppPageContent>
    </>
  );
};

// used with React.Lazy, but eslint has problems
// eslint-disable-next-line import/no-unused-modules
export default UserDetailsFragment;
