import React, { useState } from "react";
import { useField } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

import { HabitColor } from "../../../_types";
import { FormValues } from "../useFormInitValues";
import { ColorPreview, ColorSelectDialog } from "../dialogs/ColorSelectDialog";
import { ExtraValidationText } from "components/ExtraValidationText";

const useStyles = makeStyles((theme) => ({
  preview: {
    marginRight: theme.spacing(2),
  },
  dialogButton: {
    flex: "1",
    justifyContent: "left",
  },
}));

interface Props {
  name: keyof FormValues;
  className?: string;
}

export const ColorField: React.FC<Props> = (props) => {
  const styles = useStyles();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [field, meta, helpers] = useField(props);
  const selectedColor = field.value;

  const onClose = (c: HabitColor) => {
    setDialogOpen(false);
    helpers.setValue(c);
  };

  return (
    <div className={props.className}>
      <InputLabel shrink>Color</InputLabel>

      <Box display="flex" marginTop={1}>
        <ColorPreview color={selectedColor} className={styles.preview} />
        <Button
          onClick={() => setDialogOpen(true)}
          className={styles.dialogButton}
        >
          {HabitColor[selectedColor]}
        </Button>
      </Box>

      <ExtraValidationText meta={meta} />

      <ColorSelectDialog
        onClose={onClose}
        open={isDialogOpen}
        selectedValue={selectedColor}
      />
    </div>
  );
};
