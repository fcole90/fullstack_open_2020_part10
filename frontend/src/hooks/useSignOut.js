import { useContext } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    return {
      data: { authorize: { accessToken: await authStorage.getAccessToken() } },
    };
  };

  return signOut;
};

export default useSignOut;
