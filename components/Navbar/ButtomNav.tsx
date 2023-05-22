import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { AllinBox, SportsBar, Menu } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';

const Wrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  width: '100vw',
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}))

const Container = styled(BottomNavigation)(() => ({
  width: '100%'
}))

export default function ButtomNav() {
  const router = useRouter();
  const pathname = router.pathname
  const initRoute = pathname === '/' ? 0 : pathname === '/beers' ? 1 : 2
  const [route, setRoute] = useState(initRoute);
  const [drawer, toggleDrawer] = useState(false);

  const goTo = (link: string) => {
    router.push(link)
  }

  return (
    <Wrapper>
      <Container
        showLabels
        value={route}
        onChange={(_, newValue) => {
          console.log(newValue)
          setRoute(newValue);
        }}
      >
        <BottomNavigationAction onClick={() => goTo('/collections')} label="Collection" icon={<AllinBox />} />
        <BottomNavigationAction onClick={() => goTo('/beers')} label="Beers" icon={<SportsBar />} />
        <BottomNavigationAction onClick={() => toggleDrawer(true)} label="More" icon={<Menu />} />
      </Container>
      <Sidebar drawer={drawer} toggleDrawer={toggleDrawer} />
    </Wrapper>
  );
}