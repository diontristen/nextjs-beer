import React from 'react';
import { styled } from '@mui/system';
import { AppBar, Box, Toolbar } from '@mui/material';
import Login from '../Login';
import Image from 'next/image';
import Links from './Links';
import { useRouter } from 'next/router';
const Wrapper = styled(AppBar)(() => ({
    alignItems: 'center',
    boxShadow: 'none',
    padding: '32px 0px',
    height: '100px',
    background: 'rgba(49, 47, 52, 0.8)',
    backdropFilter: 'blur(62.5px)',
}))

const Container = styled(Toolbar)(() => ({
    width: '100%'
}))


const Navbar = () => {
    const router = useRouter()
    return (
        <Wrapper position='sticky'>
            <Container>
                <Box
                onClick={(() => router.push('/'))}
                sx={{ cursor: 'pointer', flex: 1 }}>
                    <Image
                        src='/assets/logo/ibp-logx.png'
                        alt="Internation Beer Pub Logo"
                        width={235}
                        height={75}
                        priority
                    />
                </Box>
                <Links />
                <Login />
            </Container>
        </Wrapper>
    );
};

export default Navbar;