import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { getProviderName } from "../../utils";
import { FirstDayOfWeekSelect } from "./fields/FirstDayOfWeekSelect";
import { TimeDisplaySelect } from "./fields/TimeDisplaySelect";
import { ReadonlyField } from "components/ReadonlyField";
import { SectionHeader } from "components/SectionHeader";
import { CurrentUser, UserPreferences } from "~storage";
import { displayDateWithDiff } from "utils/date";

interface Props {
  user: CurrentUser;
  userPreferences: UserPreferences;
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  fieldSpacing: {
    marginBottom: theme.spacing(3),
  },
}));

export const AccountFields: React.FC<Props> = ({
  user,
  userPreferences,
  className,
}) => {
  const styles = useStyles();

  const emailStatus =
    user.email == null
      ? ""
      : user.emailVerified
      ? "(verified)"
      : "(not verified)";

  return (
    <div className={className}>
      <ReadonlyField
        id="providerName"
        label="Authentication method"
        value={getProvidersValue(user)}
      />
      <ReadonlyField
        id="email"
        label={`Email ${emailStatus}`}
        value={user.email}
        onMissingValue="hide"
      />
      <ReadonlyField
        id="created_at"
        label="Joined"
        value={displayDateWithDiff(user.creationTime)}
      />

      <SectionHeader>Preferences</SectionHeader>
      <FirstDayOfWeekSelect
        currentValue={userPreferences.firstDayOfWeek}
        className={styles.fieldSpacing}
      />
      <TimeDisplaySelect currentValue={userPreferences.timeDisplay} />
    </div>
  );
};

function getProvidersValue(user: CurrentUser): string {
  return user.providersData
    .map((e) => getProviderName(e.providerId))
    .filter((e) => Boolean(e))
    .join(", ");
}
