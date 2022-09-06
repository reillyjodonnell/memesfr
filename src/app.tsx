import { useState } from 'react';
import './app.css';
import Memesfr from './components/memesfr';
import AuthProvider from './contexts/auth-context';
function App() {
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  return (
    <AuthProvider setLoadingUser={setLoadingUser}>
      <Memesfr
        loadingContent={loadingContent}
        setLoadingContent={setLoadingContent}
        setLoadingUser={setLoadingUser}
        loadingUser={loadingUser}
      />
    </AuthProvider>
  );
}

export default App;
