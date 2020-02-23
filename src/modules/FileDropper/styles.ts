import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  '@global': {
    '.container': {
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'sans-serif',
    },

    '.container > p': {
      fontSize: '1rem',
    },

    '.container > em': {
      fontSize: '.8rem',
    },

    '.dropzone': {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      borderWidth: '2px',
      borderRadius: '2px',
      borderColor: '#eeeeee',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
    },

    '.dropzone.focus': {
      borderColor: '#2196f3',
    },

    '.dropzone.disabled': {
      opacity: '0.6',
    },
  },
}));
