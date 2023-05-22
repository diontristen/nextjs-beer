import type { NextPage } from 'next'
import { styled } from '@mui/system';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles'
import Layout from '../components/Layout'


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

const HeroImageContainer = styled('div')(() => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
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

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '32px',
  marginTop: '16px',
  '> a': {
    width: '50%',
    height: '48px',
  }
}))

const Home: NextPage = () => {
  const theme = useTheme()

  return (
    <Layout>
      <HeroContainer>
        <HeroContentContainer>
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              fontWeight: 500,
              [theme.breakpoints.down('lg')]: {
                fontSize: '64px'
              },
              [theme.breakpoints.down('md')]: {
                fontSize: '48px'
              },
            }}
          >
            <Typography
              variant="h1"
              color="primary.main"
              sx={{
                marginRight: '16px',
                fontWeight: 500,
                [theme.breakpoints.down('lg')]: {
                  fontSize: '64px'
                },
                [theme.breakpoints.down('md')]: {
                  fontSize: '48px'
                },
              }}
              gutterBottom
              component='span'
            >
              Punk Drinks
            </Typography>
            for every moment.
          </Typography>
          <HeroSubtitle variant="subtitle1" gutterBottom>
            Beer Pub® is a trusted craft beer and spirits marketplace designed to make every online drink purchase convenient, fast, and reliable.
          </HeroSubtitle>
          <ButtonContainer>
            <Button
              href="/about"
              variant="outlined">
              About Us
            </Button>
            <Button
              href="/beers"
              variant="contained">
              Products
            </Button>
          </ButtonContainer>
        </HeroContentContainer>
        <HeroImageContainer>
          <Box sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            maxHeight: '700px',
          }}>
            <Image
              src='/assets/hero/hero-banner.png'
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
    </Layout>
  )
}

export default Home
