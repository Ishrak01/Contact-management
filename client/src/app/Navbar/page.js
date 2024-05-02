
"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  // Get the router instance
  const router = useRouter();

  // Check if localStorage is defined
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  // Use localStorage only if it's available
  const token = isLocalStorageAvailable ? localStorage.getItem("auth") : null;

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("auth");
    router.push("/AdminPage/Login");
  };

  return (
    <div>
      <div className="bg-purple-500 text-white text-bold justify-between flex p-4 m-4">
        <Link href="/">Home Page</Link>
        {token ? (
          <button onClick={logout}>Log Out</button>
        ) : (
          <>
            <Link href="/AdminPage/Registration">Registration</Link>
            <Link href="/AdminPage/Login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
