import React from 'react';
import Header from '../components/molecules/Header';
import Button from '../components/atoms/Button';
import { FaSignInAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <div>
      <Header
        title="Welcome to Vigilo"
        subtitle="The smarter way to manage class attendance"
        variant="gradient"
        actions={
          <>
            <Button
              variant="primary"
              size="lg"
              icon={FaSignInAlt}
              iconPosition="left">
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg">
              Learn More
            </Button>
          </>
        }
      />
    </div>
  );
};

export default Home;
