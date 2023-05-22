import React from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";

export interface Route {
    label: string
    link: string
    key: string
    private: boolean
}

const ROUTES: Route[] = [
    {
        label: 'About Us',
        link: '/about',
        key: 'route-about',
        private: false
    },
    {
        label: 'Beers',
        link: '/beers',
        key: 'route-beers',
        private: false
    },
    {
        label: 'Collections',
        link: '/collections',
        key: 'route-collections',
        private: true
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
    const { data: session } = useSession()
    const pathname = router.pathname

    return (
        <LinkContainer>
            {ROUTES.map((route) => (
                <RouteLink 
                sx={{
                    textDecoration:  pathname === route.link ? 'underlined' : 'none',
                    display: route.private ? session ? 'display' : 'none' : 'display'
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