import React from "react";
import { useStorage } from "~firebaseUtils";

const UserDefault = () => {
  return <div>/me User default page</div>;
};

// eslint-disable-next-line import/no-unused-modules
export default (): JSX.Element => {
  const storage = useStorage();
  console.log({ storage }); // test lazy load?

  return <UserDefault />;
};
