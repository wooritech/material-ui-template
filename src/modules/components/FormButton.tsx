/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { ComponentBaseProps } from '~/components/types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

interface FormButtonProps extends ComponentBaseProps {
  disabled: boolean;
  mounted?: boolean;
}

type FormButtonPropTypes = FormButtonProps & ButtonProps;

const FormButton: React.FC<FormButtonPropTypes> = (props) => {
  const { disabled, mounted, ...others } = props;
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      disabled={!mounted || disabled}
      type="submit"
      variant="contained"
      {...others}
    />
  );
};

export default FormButton;
