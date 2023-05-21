import React from 'react';
import { styled } from '@mui/system';
import { Button, Box, Typography, Tooltip, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { useSession, signIn, signOut } from "next-auth/react"

const Login = () => {
    const { data: session } = useSession()
    const user = session?.user
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    if (session) {
        return (
            <Box sx={{ flexGrow: 0, marginLeft: '32px' }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src={user?.image ?? '/static/images/avatar/2.jpg'} />
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
                    <MenuItem
                        key="name"
                    >
                        <Typography textAlign="center">{user?.name}</Typography>
                    </MenuItem>
                    <MenuItem
                        key="name"
                    >
                        <Typography textAlign="center">Collection</Typography>
                    </MenuItem>
                    <MenuItem
                        key="logout"
                        onClick={signOut}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        )
    }
    return (
        <LoginButton
            sx={{
                marginLeft: '32px',
            }}
            onClick={() => signIn()}
            variant="contained">
            Login
        </LoginButton>
    )
};

const LoginButton = styled(Button)(() => ({
    fontWeight: 600,
    color: '#fff',
    padding: '8px 32px'
}))

const UserBox = styled(Box)(() => ({
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginLeft: '16px',
}))

export default Login;