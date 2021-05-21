import React from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { useFormikContext } from "formik";

import { AppMenuToggleButton } from "components/AppMenu";
import { ToolbarTitle } from "components/ToolbarTitle";
import { ButtonLoading } from "components/ButtonLoading";

const useStyles = makeStyles((theme) => ({
  menuButton: {},
  saveButton: {
    "&:disabled": {
      color: theme.palette.text.disabled,
    },
  },
}));

interface Props {
  isEdit: boolean;
}

export const HabitFormHeader: React.FC<Props> = ({ isEdit }) => {
  const styles = useStyles();
  const history = useHistory();
  const formikState = useFormikContext();

  const isSubmitting = formikState.isSubmitting;
  const isValid = formikState.submitCount == 0 || formikState.isValid;
  const isSubmittable = formikState.dirty && !isSubmitting && isValid;

  const goBack = () => history.goBack();

  return (
    <AppBar position="static">
      <Toolbar>
        {isEdit ? (
          <IconButton
            edge="start"
            color="inherit"
            className={styles.menuButton}
            onClick={goBack}
          >
            <Icon>chevron_left</Icon>
          </IconButton>
        ) : (
          <AppMenuToggleButton />
        )}

        <ToolbarTitle alignLeft>
          {isEdit ? "Edit habit" : "Create habit"}
        </ToolbarTitle>

        <ButtonLoading
          type="submit"
          color="inherit"
          edge="end"
          disabled={!isSubmittable}
          isLoading={isSubmitting}
          className={styles.saveButton}
        >
          {isEdit ? "Save" : "Create"}
        </ButtonLoading>
      </Toolbar>
    </AppBar>
  );
};
