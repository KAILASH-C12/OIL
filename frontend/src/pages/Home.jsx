import React from 'react';
import { Helmet } from 'react-helmet-async';
import WhatsAppButton from '../components/WhatsAppButton';
import Banner from '../components/Banner';

// Import Home Sections
import HomeHero from '../components/home/HomeHero';
import HomeStats from '../components/home/HomeStats';
import HomeCategories from '../components/home/HomeCategories';
import HomeBestSellers from '../components/home/HomeBestSellers';
import HomeWhyChooseUs from '../components/home/HomeWhyChooseUs';
import HomeWholesale from '../components/home/HomeWholesale';
import HomeProcess from '../components/home/HomeProcess';
import HomeTestimonials from '../components/home/HomeTestimonials';
import HomeDeliveryAreas from '../components/home/HomeDeliveryAreas';
import HomeFAQ from '../components/home/HomeFAQ';
import HomeContactCTA from '../components/home/HomeContactCTA';

const Home = () => {
  return (
    <div className="w-full relative">
      <Helmet>
        <title>Premium Oils | Wholesale & Retail Edible Oils in India</title>
        <meta name="description" content="India's leading B2B & B2C edible oil distribution platform. Order pure mustard oil, refined soybean oil, and groundnut oil with Cash on Delivery." />
        <meta name="keywords" content="edible oil, mustard oil wholesale, refined oil distributors, bulk cooking oil india" />
      </Helmet>
      
      <Banner />
      <WhatsAppButton />

      {/* Rendering all the structured sections */}
      <HomeHero />
      <HomeStats />
      <HomeBestSellers />
      <HomeWhyChooseUs />
      {/* Live Market Prices could go here if implemented as a separate component */}
      <HomeProcess />
      <HomeTestimonials />
      <HomeDeliveryAreas />
      <HomeFAQ />
      <HomeContactCTA />
      
    </div>
  );
};

export default Home;
