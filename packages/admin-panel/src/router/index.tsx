import React from 'react';
import { connect } from 'react-redux';
import ContentWrapper from '../components/ContentWrapper';
import Navigation from '../components/Navigation';
import Copyright from '../components/Copyright';
import Login from '../components/Login';
import { User } from '../store/reducers/user';
import { Store } from '../store';

interface RouterProps {
  user: User;
}

const Router: React.FC<RouterProps> = ({ user }) => {
  if (user.username === null) {
    return <Login />;
  }
  return (
    <>
      <Navigation />
      <ContentWrapper>
        <Copyright />
      </ContentWrapper>
    </>
  );
};

export default connect(({ user }: Store) => ({
  user
}))(Router);
