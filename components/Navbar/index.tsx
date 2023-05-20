import React from 'react';
import { styled } from '@mui/system';
import { AppBar, Box, Toolbar } from '@mui/material';
import Login from '../Login';
import Image from 'next/image';
import Links from './Links';

const Wrapper = styled(AppBar)(() => ({
    alignItems: 'center',
    background: 'transparent',
    boxShadow: 'none',
    padding: '32px 0px',
}))

const Container = styled(Toolbar)(() => ({
    width: '100%'
}))


const Navbar = () => {
    return (
        <Wrapper position='sticky'>
            <Container>
                <Box sx={{ cursor: 'pointer', flex: 1 }}>
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