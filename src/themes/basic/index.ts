import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';

// 커스텀 변수 사용을 위해 re declare
declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    custom: {
      headerHeightHome: number;
      headerHeightMain: number;
      headerHeightEdit: number;
      sidebarWidthEdit: number;
      sidebarWidthMain: number;
      pageWidthHome: number;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom?: {
      headerHeightHome?: number;
      headerHeightMain?: number;
      headerHeightEdit?: number;
      sidebarWidthEdit?: number;
      sidebarWidthMain?: number;
      pageWidthHome?: number;
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
      minHeight: 96,
    },
  },
  // 커스텀 변수
  custom: {
    headerHeightHome: 60,
    headerHeightMain: 96,
    headerHeightEdit: 96,
    sidebarWidthEdit: 300,
    sidebarWidthMain: 400,
    pageWidthHome: -1,
  },
});

export default theme;
