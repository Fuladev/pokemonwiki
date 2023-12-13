'use client'

import React, { useEffect, useRef, useState } from 'react';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCXw31t5iDiQ0pzAEo_-NsuYQIsLXpghuo",
  authDomain: "pokemonwiki-91da4.firebaseapp.com",
  projectId: "pokemonwiki-91da4",
  storageBucket: "pokemonwiki-91da4.appspot.com",
  messagingSenderId: "1011317117795",
  appId: "1:1011317117795:web:4abbf7513edc6e61b27956",
  measurementId: "G-61DBQ1FECX"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


import { ThemeProvider, createTheme } from '@mui/material/styles';

import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';

const pages = ['Dashboar'];
const settings = ['Profile', 'Logout'];

export const NavBar: React.FC = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const router = useRouter();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);

    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClick = (setting : string) => {
        console.log(setting);
        if (setting === 'Profile') {
          router.push('/profile');
          handleCloseUserMenu();
        } else if (setting === 'Logout') {
          handleSignOut();
          handleCloseUserMenu();
        }else if (setting === 'Dashboar'){
            router.push('/dashboard')
            handleCloseNavMenu();
        }
      };

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            router.push('/login');
        }).catch((error) => {
            console.log(error);
        });
    }

    const Theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#ffebee',
            },
        },
    });

    return (
        <ThemeProvider theme={Theme}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <CatchingPokemonIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#f44336' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/dashboard"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#f44336',
                                textDecoration: 'none',
                            }}
                        >
                            POKEWIKI
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon sx={{ color: '#f44336' }} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={() => handleMenuClick(page)}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <CatchingPokemonIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#f44336' }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#f44336',
                                textDecoration: 'none',
                            }}
                        >
                            POKEWIKI
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => handleMenuClick(page)}
                                    sx={{ my: 2, color: '#f44336', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="https://www.shareicon.net/data/512x512/2016/08/05/807310_gaming_512x512.png" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};
