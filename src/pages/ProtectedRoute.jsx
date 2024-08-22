import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
export default function ProtectedRoute({ children, requiredAdmin }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (!user || (requiredAdmin && !user.isAdmin)) {
    return navigate('/', { replace: true });
  }

  return children;
}
