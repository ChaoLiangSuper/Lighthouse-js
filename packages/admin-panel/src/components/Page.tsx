import React from 'react';
import Navigation from './Navigation';
import ContentWrapper from './ContentWrapper';

const Page: React.FC = ({ children }) => (
  <>
    <Navigation />
    <ContentWrapper>{children}</ContentWrapper>
  </>
);

export default Page;
