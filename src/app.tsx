import { useState } from 'react';
import './app.css';
import Loading from './components/loading';
import Memesfr from './components/memesfr';
import AuthProvider from './contexts/auth-context';
import ThemeProvider from './contexts/theme-context';
function App() {
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  return (
    <ThemeProvider>
      <AuthProvider setLoadingUser={setLoadingUser}>
        {loadingData || loadingUser ? (
          <Loading />
        ) : (
          <Memesfr
            setLoadingData={setLoadingData}
            loadingData={loadingData}
            setLoadingUser={setLoadingUser}
            loadingUser={loadingUser}
          />
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
