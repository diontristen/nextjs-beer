import React from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';

export interface Route {
    label: string;
    link: string;
    key: string;
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
    }
]

const LinkContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '32px',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    },
}))

const RouteLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover': {
        color: theme.palette.primary.light,
        fontWeight: 900,
        transform: 'scale(1.05)'
    }
}))

const Links = () => {
    const router = useRouter();
    const pathname = router.pathname

    return (
        <LinkContainer>
            {ROUTES.map((route) => (
                <RouteLink 
                sx={{
                    textDecoration:  pathname === route.link ? 'underlined' : 'none',
                }}
                href={route.link} 
                key={route.key}>
                    {route.label}
                </RouteLink>
            ))}
        </LinkContainer>
    );
};

export default Links;