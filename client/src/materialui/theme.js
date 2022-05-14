import { createTheme , ThemeProvider } from '@mui/material/styles';

import { useMemo, useState, createContext } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ColorTheme = ({children}) => {
    const [mode, setMode] = useState('light');
    const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
    );
  
    const theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode,
          },
          typography: { 
           // fontFamily: ['"Alkhemikal"']
          },
          components:{ // override MUI components CSS
            MuiPaper:{
              styleOverrides:{
                root:{

                }
              }
            }
          }
        }),
      [mode],
    );
  

    return(
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default ColorTheme;