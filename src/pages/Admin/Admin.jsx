import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function Admin() {
  const { user } = useAuth();
  const [demoMode, setDemoMode] = useState(false);

  if (user || demoMode) {
    return <AdminDashboard onLogout={() => setDemoMode(false)} />;
  }

  return <AdminLogin onDemoLogin={() => setDemoMode(true)} />;
}
