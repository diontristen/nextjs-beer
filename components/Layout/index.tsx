import React from 'react';
import { Container } from '@mui/material';
import { styled} from '@mui/system';

interface LayoutProps {
    children?: React.ReactNode;
}

const Wrapper = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    padding: '32px !important',
}))

const Layout = ({ children }: LayoutProps) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
};

export default Layout;