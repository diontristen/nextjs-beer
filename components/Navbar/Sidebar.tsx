import React from 'react';
import { Drawer, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import { Close } from '@mui/icons-material';
import { Route } from './Links';

interface SidebarProps {
    drawer: boolean
    toggleDrawer: (arg0: boolean) => void
}

const ROUTES: Route[] = [
    {
        label: 'About Us',
        link: '/about',
        key: 'route-about'
    },
    {
        label: 'Beers',
        link: '/beers',
        key: 'route-beers'
    },
    {
        label: 'Collection',
        link: '/collection',
        key: 'route-collection'
    }
]

const LinkContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '32px',
    flexDirection: 'column',
    padding: '16px',
    width: '100vw'
}))

const RouteLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover': {
        color: theme.palette.primary.light,
    }
}))

const Sidebar = ({ drawer, toggleDrawer }: SidebarProps) => {
    const onClose = () => {
        toggleDrawer(false)
    }


    return (
        <Drawer
            anchor="right"
            open={drawer}
            onClose={onClose}
            sx={{
            }}
        >
            <Box sx={{ textAlign: 'right'}}>
                <IconButton
                    onClick={onClose}
                >
                    <Close />
                </IconButton>
            </Box>
            <LinkContainer>
                {ROUTES.map((route) => (
                    <RouteLink href={route.link} key={route.key}>
                        {route.label}
                    </RouteLink>
                ))}
            </LinkContainer>
        </Drawer>
    );
};

export default Sidebar;