import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/system';

const AboutHero = () => {
    return (
        <HeroContainer>
            <HeroContentContainer>
                <HeroTitle
                    variant="h1"
                    gutterBottom
                >
                    <HeroTitle
                        variant="h1"
                        color="primary.main"
                        sx={{
                            marginRight: '16px',
                        }}
                        gutterBottom
                        component='span'
                    >
                        Punk Beer
                    </HeroTitle>
                    Team.
                </HeroTitle>
                <HeroSubtitle variant="subtitle1" gutterBottom>
                    Beer Pub started as a simple text from one friend to another: “Why can't you get alcohol delivered?" When we realized that alcohol delivery was, in fact, legal, we set out with a little bit of luck and a lotta bit of determination to build a three-tier compliant technology company that would change the way we shop for punk beers.
                </HeroSubtitle>
                <Button
                    sx={{
                        width: '50%',
                        margin: '32px auto',
                    }}
                    variant="contained">
                    Check our Team
                </Button>
            </HeroContentContainer>
            <HeroImageContainer>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    maxHeight: '700px',
                }}>
                    <Image
                        src='/assets/hero/about-hero.png'
                        alt="Internation Beer Pub Logo"
                        priority
                        fill={true}
                        style={{
                            objectFit: 'contain'
                        }}
                    />
                </Box>
            </HeroImageContainer>
        </HeroContainer>
    );
};

const HeroContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: '16px',
    height: 'calc(100vh - 156px)',
    minHeight: '650px',
    '>div': {
        width: '50%',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        marginBottom: '56px',
        '>div': {
            width: '100%',
        },
    },
}))

const HeroContentContainer = styled('div')(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: '64px',
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        paddingRight: '0',
    },
}))

const HeroTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    [theme.breakpoints.down('lg')]: {
        fontSize: '64px'
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '48px'
    },
}))

const HeroSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: '24px',
    [theme.breakpoints.down('lg')]: {
        fontSize: '20px',
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '18px',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '16px',
    },
}))

const HeroImageContainer = styled('div')(() => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
}))

export default AboutHero;