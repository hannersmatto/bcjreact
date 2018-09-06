import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import 'react-datepicker/dist/react-datepicker.css';

import appSyncConfig from "./AppSync";
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient, { defaultDataIdFromObject } from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";

import './App.css';
import AllEvents from './Components/AllEvents';
import NewEvent from './Components/NewEvent';
import ViewEvent from './Components/ViewEvent';
import ViewTeam from './Components/ViewTeam';
import ViewResource from './Components/ViewResource';
import NewTeam from './Components/NewTeam';
import NewResource from './Components/NewResource';
import AllResources from './Components/AllResources';
import AllTeams from './Components/AllTeams';
import Header from './Components/Header';



import Client from 'aws-appsync'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react';


//Get configs
import awsmobile from './aws-exports';

// Amplify init
Amplify.configure(awsmobile);

const Home = () => (
  <div className="ui container">
  <Header/>
    <AllEvents />
  </div>
);

const AllResourcesLayout = () => (
  <div className="ui container">
  <Header/>
    <AllResources />
  </div>
)

const AllTeamsLayout = () => (
  <div className="ui container">
  <Header/>
      <AllTeams/>
  </div>
)

const App = () => (

  <Router>
    <div>
      <Route exact={true} path="/" component={Home} />
      <Route path="/event/:id" component={ViewEvent} />
      <Route path="/team/:id" component={ViewTeam} />
      <Route path="/resource/:id" component={ViewResource} />
      <Route path="/newEvent" component={NewEvent} />
      <Route path="/resources" component={AllResourcesLayout} />
      <Route path="/newResource" component={NewResource} />
      <Route path="/teams" component={AllTeamsLayout} />
      <Route path="/newTeam" component={NewTeam} />

    </div>
  </Router>
);

const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey: appSyncConfig.apiKey,
  },
  cacheOptions: {
    dataIdFromObject: (obj) => {
      let id = defaultDataIdFromObject(obj);

      if (!id) {
        const { __typename: typename } = obj;
        switch (typename) {
          case 'Comment':
            return `${typename}:${obj.commentId}`;
          default:
            return id;
        }
      }

      return id;
    }
  }
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <AppWithAuth />
    </Rehydrated>
  </ApolloProvider>
);

const federated = {
    google_client_id: '',
    facebook_app_id: '',
    amazon_client_id: ''
};

const AppWithAuth = withAuthenticator(App, federated);
export default WithProvider;
