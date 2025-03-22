/**
 * @author ericmonroydev
 * @description Contenedor padre, provee el contexto de la aplicación.
 * @copyright Random Interactive
 *
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppProvider from '@Auth/authProvider';
import AppRouter from '@Router/AppRouter';
import '@Sass/main.scss';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
