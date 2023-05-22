import React from 'react';
import { styled } from '@mui/system';
import {
    Button,
    Box,
    Typography,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Badge
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollectionDrawer, selectsCartItems } from "../../store/collectionSlice";
const Login = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(selectsCartItems) ?? []
    const cartLength = cartItems.length ?? 0
    const { data: session } = useSession()
    const user = session?.user

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCollectionDrawer = () => {
        dispatch(toggleCollectionDrawer())
        setAnchorElUser(null);
    }

    const handleSignout = () => {
        signOut()
        setAnchorElUser(null);
    }

    if (session) {
        return (
            <Container>
                <IconButton
                    onClick={handleCollectionDrawer}
                >
                    <Badge color="primary" badgeContent={cartLength}>
                        <ShoppingCart />
                    </Badge>
                </IconButton>
                <Box sx={{ flexGrow: 0 }}>
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
                            key="logout"
                            onClick={handleSignout}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Container>
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

const Container = styled(Box)(({ }) => ({
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginLeft: '8px'
}))

export default Login;