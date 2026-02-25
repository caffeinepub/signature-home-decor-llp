import React from 'react';
import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import BestSellers from '../components/BestSellers';
import Testimonials from '../components/Testimonials';
import InstagramGallery from '../components/InstagramGallery';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <Testimonials />
      <InstagramGallery />
    </>
  );
}
