import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';

// 커스텀 변수 사용을 위해 re declare
declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    custom: {
      drawerWidth: number;
      landingWidth: number;
      headerHomeHeight: number;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom?: {
      drawerWidth?: number;
      landingWidth?: number;
      headerHomeHeight?: number;
    };
  }
}

// Create a theme instance.
// eslint-disable-next-line import/no-mutable-exports
const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  shape: {
    borderRadius: 3,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
  // 커스텀 변수
  custom: {
    drawerWidth: 256,
    headerHomeHeight: 90,
    // landingWidth: 800,
  },
});

export default theme;
