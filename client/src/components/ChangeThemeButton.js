import { useTheme } from '@emotion/react'
import { ColorModeContext } from '../materialui/theme'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext } from 'react';
import { IconButton } from '@mui/material';

export default function ChangeThemeButton(){
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext)
  
    return (
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    )
}
