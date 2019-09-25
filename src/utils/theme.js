import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'AmaticaSC',
      '-apple-system',
      'Roboto',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export { theme }