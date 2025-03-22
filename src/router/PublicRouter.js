import { Route, Redirect, useLocation } from 'react-router-dom';

// Context
import useAuth from '@Auth/userAuth';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { contextValue } = useAuth();
  const location = useLocation();
  return <Route {...rest}>{!contextValue.isLogged() ? <Component /> : <Redirect to={{ pathname: '/', state: { from: location } }} />}</Route>;
};

export default PublicRoute;
