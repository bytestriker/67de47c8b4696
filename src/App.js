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
import ErrorBoundary from '@Components/ErrorBoundary'; // adjust path accordingly

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
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
