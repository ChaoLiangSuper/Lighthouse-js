import React from 'react';
import { connect } from 'react-redux';
import ContentWrapper from '../components/ContentWrapper';
import Navigation from '../components/Navigation';
import Copyright from '../components/Copyright';
import Login from '../components/Login';
import DashboardView from '../components/DashboardView';
import DirectoryView from '../components/DirectoryView';
import { ViewState, Store } from '../types';

interface RouterProps {
  viewState: ViewState<any>;
}

const Page: React.FC = ({ children }) => (
  <>
    <Navigation />
    <ContentWrapper>
      {children}
      <Copyright />
    </ContentWrapper>
  </>
);

const Router: React.FC<RouterProps> = ({ viewState }) => {
  if (viewState.view === 'login') {
    return <Login />;
  }
  if (viewState.view === 'directory') {
    return (
      <Page>
        <DirectoryView />
      </Page>
    );
  }
  return (
    <Page>
      <DashboardView />
    </Page>
  );
};

export default connect(({ viewState }: Store) => ({
  viewState
}))(Router);
