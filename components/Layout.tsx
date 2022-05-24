import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Person as PersonIcon,
} from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { ReactElement } from 'react'

type Props = {
  children: ReactElement
}

export default function Layout(props: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Link href="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              Page
            </Button> */}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Link href="/user">
              <IconButton size="large" edge="start" color="inherit">
                <PersonIcon />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box>
        <Container>{props.children}</Container>
      </Box>
    </Box>
  )
}
