import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Libs
import anime from 'animejs';

// Components
import Main from '@Components/Main';
import Splash from '@Components/Splash';

const AppRouter = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    

    
  }, []);

  return (
    <Fragment>
      
        <Router>
          <Switch>
            <Main />
          </Switch>
        </Router>
      
    </Fragment>
  );
};

export default AppRouter;
