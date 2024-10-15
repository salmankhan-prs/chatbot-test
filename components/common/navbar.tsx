import Link from 'next/link';
import { Button } from '../common/button'; // Assuming you have a button component
import useAuth from '@/hooks/useAuth';

const Navbar = () => {
  const { userId, isSuperAdmin, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking authentication
  }

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/">
         Home
        </Link>
        {isSuperAdmin && (
          <Link href="/admin">
          Dashbaord
          </Link>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {userId && (
          <Button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
