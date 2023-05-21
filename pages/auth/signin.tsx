import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { Box, Button, Typography } from "@mui/material";
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import { authOptions } from "../api/auth/[...nextauth]";
import Image from "next/image";
export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()

    return (
        <Container>
            <CenterContainer>
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
                <Typography
                    sx={{
                        textAlign: 'center',
                        marginBottom: '32px',
                    }}
                    variant="h4">
                    Log In
                </Typography>
                {Object.values(providers).map((provider) => (
                    <ProviderButton
                        key={provider.name}
                        variant="contained"
                        onClick={() => signIn(provider.id)}
                        startIcon={<Box sx={{
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                        }}>
                            <Image
                                src={`https://authjs.dev/img/providers/${provider.id}.svg`}
                                height={24}
                                width={24}
                                alt="Provider Logo"
                            />
                        </Box>}

                    >
                        Connect with {provider.name}
                    </ProviderButton>
                ))}
            </CenterContainer>
        </Container>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (session) {
        return { redirect: { destination: "/" } };
    }

    const providers = await getProviders();

    return {
        props: { providers: providers ?? [] },
    }
}

const Container = styled(Box)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    minHeight: '500px'
}))

const CenterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: '16px',
    height: 'fit-content',
    padding: '32px',
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
}))

const ProviderButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#FFF',
    color: theme.palette.secondary.main,
    textTransform: 'initial',
    padding: '8px 24px',
    height: '48px',
    width: '250px',
    ':hover': {
        backgroundColor: '#C1C1C1',
        transform: 'scale(1.05)'
    }
}))