/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PaletteIcon from '@material-ui/icons/Palette';
import HistoryIcon from '@material-ui/icons/History';
import CodeIcon from '@material-ui/icons/Code';
import { ComponentBaseProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(
  props: ListItemProps<'a', { button?: true; title: string; icon: React.ReactElement }>,
) {
  const { icon, title } = props;
  return (
    <ListItem button component="a" {...props}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
}

export interface SideMenuProjectSettingsProps extends ComponentBaseProps {}

const SideMenuProjectSettingsProps: React.FC<SideMenuProjectSettingsProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main menus">
        <ListItemLink href="/projects/settings" title="기본 정보" icon={<DashboardIcon />} />
        <ListItemLink href="/projects/members" title="멤버 관리" icon={<PeopleAltIcon />} />
        <ListItemLink href="/projects/versions" title="문서 버전 관리" icon={<HistoryIcon />} />
        <ListItemLink href="/projects/styles" title="스타일 관리" icon={<PaletteIcon />} />
      </List>
      <Divider light variant="middle" />
      <List component="nav" aria-label="secondary menus">
        <ListItemLink
          href="/projects/codeEditorSettings"
          title="코드 편집기 설정"
          icon={<CodeIcon />}
        />
      </List>
    </div>
  );
};

export default SideMenuProjectSettingsProps;
