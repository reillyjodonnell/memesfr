import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

export default function AuthenticatedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { currentUser, loadingUser } = useAuth();

  return currentUser ? children : <Navigate to="/" replace />;
}
