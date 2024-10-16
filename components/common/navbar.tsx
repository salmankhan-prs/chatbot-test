import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../common/button";
import { useCallback, useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setIsSuperAdmin(!!user?.superAdmin);
    }
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  }, [router]);

  return (
    <nav className="bg-gray-800 px-4 py-2  text-white flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/home">Home</Link>
        {isSuperAdmin && <Link href="/admin">Super Admin</Link>}
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
