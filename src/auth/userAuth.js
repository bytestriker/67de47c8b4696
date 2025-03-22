import { useContext } from 'react'; // para consumir es useContext
import AppContext from '@Auth/appContext';

export default function useAuth() {
  // devolvera los valores del contexto
  return useContext(AppContext);
}
