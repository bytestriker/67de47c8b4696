import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from '@Components/NotFound';

// Libs
import anime from 'animejs';

// Components
import Main from '@Components/Main';
import Splash from '@Components/Splash';

const AppRouter = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  console.log("Loading app router")

  return (
    <Fragment>
      <Router>
        <Switch>
          <Main />
          {/* <Route component={NotFound} /> */}
          {/* 404 fallback */}
        </Switch>
      </Router>
    </Fragment>
  );
};

export default AppRouter;
