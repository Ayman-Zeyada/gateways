import { Fragment } from 'react';

import './App.css';
import GatewaysList from './components/gateways/gateways-list';
import Card from './components/UI/card';

function App() {
  return (
    <Fragment>
      <div className="App">
        <Card className="content-wrapper">
          <GatewaysList />
        </Card>
      </div>
    </Fragment>
  );
}

export default App;
