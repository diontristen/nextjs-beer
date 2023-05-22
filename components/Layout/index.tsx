import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import Navbar from '../Navbar';
import ButtomNav from '../Navbar/ButtomNav';
import SidebarCollection from '../Collections/SidebarCollection';
interface LayoutProps {
    children?: React.ReactNode;
}

const Wrapper = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
}))

const Component = styled('div')(() => ({
    padding: '0 32px !important',
}))

const Layout = ({ children }: LayoutProps) => {
    return (
        <Wrapper>
            <Navbar />
            <SidebarCollection />
            <Component>
                {children}
            </Component>
            <ButtomNav />
        </Wrapper>
    );
};

export default Layout;