import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/system';

const TEAM = [
    {
        key: 'team-1',
        name: 'Gon Freecss',
        position: 'Founder',
        img: '/assets/team/user.png'
    },
    {
        key: 'team-2',
        name: 'Gon Freecss',
        position: 'Founder',
        img: '/assets/team/user.png'
    },
    {
        key: 'team-3',
        name: 'Gon Freecss',
        position: 'Founder',
        img: '/assets/team/user.png'
    }
]


const Team = () => {
    return (
        <TeamContainer>
            <Typography
                variant='h4'
                sx={{
                    fontWeight: 600,
                    textAlign: 'center',
                    marginBottom: '64px'
                }}
            >
                Punk Beer Team
            </Typography>
            <TeamListContainer>
                {TEAM.map((team) => (
                    <TeamBox key={team.key}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                position: 'relative',
                                minHeight: '350px',
                            }}
                        >
                            <Image
                                src={team.img}
                                alt="Team Member Iamge"
                                priority
                                fill={true}
                                style={{
                                    borderRadius: '50%'
                                }}
                            />
                        </Box>
                        <TeamContent>
                            <Typography
                                variant="h4"
                                color="primary.main"
                                sx={{
                                    fontWeight: 700
                                }}
                            >
                                {team.name}
                            </Typography>
                            <Typography variant="h6">
                                {team.position}
                            </Typography>
                        </TeamContent>
                    </TeamBox>
                ))}
            </TeamListContainer>
        </TeamContainer>
    );
};

const TeamContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: '120px 0px',
    marginBottom: '32px'
}))

const TeamListContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '32px',
}))

const TeamBox = styled(Box)(({ theme }) => ({
    width: '33%',
    height: 'fit-content'
}))

const TeamContent = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginTop: '16px'
}))

export default Team;