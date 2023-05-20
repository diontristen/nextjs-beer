import React from 'react';
import Layout from '../components/Layout';
import AboutHero from '../components/About/Hero';
import Team from '../components/About/Team';
const About = () => {
    return (
        <Layout>
            <AboutHero />
            <Team />
        </Layout>
    );
};

export default About;