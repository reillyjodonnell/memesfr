import { useState } from 'react';
import './app.css';
import Memesfr from './components/memesfr';
import AuthProvider from './contexts/auth-context';
function App() {
  const [loadingUser, setLoadingUser] = useState(false);
  return (
    <AuthProvider setLoading={setLoadingUser}>
      <Memesfr setLoadingUser={setLoadingUser} loadingUser={loadingUser} />
    </AuthProvider>
  );
}

export default App;
