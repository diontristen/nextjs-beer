import React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

const Login = () => {
    return (
        <LoginButton variant="contained">
            Login
        </LoginButton>
    );
};

const LoginButton = styled(Button)(() => ({
    fontWeight: 600,
    marginLeft: '32px',
    color: '#fff'
}))

export default Login;