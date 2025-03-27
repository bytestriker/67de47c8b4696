/* eslint-disable camelcase */
import { useHistory } from 'react-router-dom';

// Context
import useAuth from '@Auth/userAuth';

// Contants
import { LocalStoragePlanets } from '@Helpers/constants';

// Services
import { singUpUser, login, createProject } from '@Service/entries';

export const useEventsRegister = () => {
  const { contextValue, setLoading } = useAuth();
  const history = useHistory();

  const handleRegister = async (data) => {
    try {
      const signup = await singUpUser(data);
      if (signup.code === 0) {
        const logIn = await login(data);
        const token = logIn.data;
        contextValue.login(token.token);

        setTimeout(async () => {
          const questions = JSON.parse(localStorage.getItem(LocalStoragePlanets.LUNA));
          await createProject(questions);
          history.push('/');
          setLoading(false);
        }, 3000);

        setTimeout(async () => {
          location.reload();
        }, 4000);
        
      } else if (signup.code < 0) {
        if (signup.messageError === 'The email has already been taken.') {
          setLoading(false);
          return 'El email ya está registrado';
        }else if (signup.messageError === 'The password field must be at least 6 characters.') {
          setLoading(false);
          return 'El password debe tener mínimo 6 caracteres';
        }else{
          setLoading(false);
          return 'Ocurrió un error al registrar usuario';
        }
      }
    } catch (error) {
      setLoading(false);
      return 'Ocurrio un error al registrar usuario';
    }
  };
  return {
    handleRegister,
  };
};
