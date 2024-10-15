import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../common/button";

const Navbar = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 px-4 py-2  text-white flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/">Home</Link>
        {/* {isSuperAdmin && (
          <Link href="/admin">
          Dashbaord
          </Link>
        )} */}
      </div>

      <div className="flex items-center space-x-4">
        <Button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white"
          size="sm"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
