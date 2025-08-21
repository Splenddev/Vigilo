import React from 'react';
import Header from '../components/molecules/Header';

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
              size="lg">
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

      <h1 className="text-3xl font-bold underline text-center mt-10">
        Welcome to the V-Client
      </h1>
      <p className="text-center mt-4 text-lg">
        This is the home page of the V-Client application. Explore the features
        and functionalities we offer.
      </p>
    </div>
  );
};

export default Home;
