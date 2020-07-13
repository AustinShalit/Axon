import React, { ReactElement } from "react";
import DataInputs from "./input/DataInputs";
import { Divider } from "@material-ui/core";
import Parameters from "./input/Parameters";

export default function Models(): ReactElement {
  return (
    <>
      <DataInputs />
      <Divider />
      <Parameters />
    </>
  );
}
