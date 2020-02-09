/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LayoutMain from '~/layouts/LayoutMain';
import PanelCard from '~/components/PanelCard';
import SideMenuProjectSettings from '~/components/SideMenuProjectSettings';
import { LayoutBaseProps } from './types';

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
  menus: {},
  contents: {},
}));

export interface LayoutProjectSettingsProps extends LayoutBaseProps {
  pageTitle: string;
}

const LayoutProjectSettings: React.FC<LayoutProjectSettingsProps> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <LayoutMain pageTitle="프로젝트 설정">
      <Grid container spacing={2} className={classes.root}>
        <Grid item sm={3} className={classes.menus}>
          <PanelCard headerTitle="" showHeaderDivider={false} paddingNone>
            <SideMenuProjectSettings />
          </PanelCard>
        </Grid>
        <Grid item sm={9} className={classes.contents}>
          {children}
        </Grid>
      </Grid>
    </LayoutMain>
  );
};

export default LayoutProjectSettings;
