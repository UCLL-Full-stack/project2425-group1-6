import { UserService } from "@/services/UserService";
import { User } from "@/types";
import { log } from "console";
import { set } from "date-fns";
import { ro } from "date-fns/locale";
import Link from "next/link";
import router from "next/router";
import { use, useEffect, useState } from "react";

const Header: React.FC = () => {

  const [loggedInUser, setLoggedInUser] = useState<string | null>(null)
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    console.log('logged in user ' + loggedInUser);
  }, [])
  
  // const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
  

  const fetcUser = async () => {
    try {
      // if (!loggedInUser) return;
      // const response = await UserService.getUserByEmail(loggedInUser);
      // if (!response.ok) throw new Error("Failed to fetch user");
      // const userData = await response.json();
      // setUser(userData);

      if(loggedInUser){
        const userResponse = await UserService.getUserByEmail(loggedInUser as string);
        if (!userResponse.ok) throw new Error("Failed to fetch user");
        const userData = await userResponse.json();
        setUser(userData);
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (loggedInUser) {
      fetcUser();
      // console.log('logged in user' +loggedInUser);

    }
  }, [loggedInUser])

  const handleClick = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setUser(null);
    router.push("/login")
  }

  return (
    <header className=" inset-0 grid grid-cols-3 bg-[#40444F] ">
      <nav className="flex col-span-2 ml-36 justify-left text-white container mx-auto p-6">
        <Link
          href="/"
          className=" flex items-center px-4 text-xl font-bold text-white hover:text-[#FCBA04] transition duration-300"

        >
          Home
        </Link>

        <Link
          href="/vehicles"
          className="flex items-center px-4 text-xl font-bold text-white hover:text-[#FCBA04] transition duration-300"
        >
          Vehicles
        </Link>
        <Link
          // href={`/users/${loggedInUser.id}`}
          // href="/users"
          href={`/users/${user?.id}`}
          className=" flex items-center px-4 text-xl font-bold text-white hover:text-[#FCBA04] transition duration-300"
        >
          User
        </Link>


      </nav>


      {!loggedInUser && (
        <div className="flex col-span-1 mr-36 justify-end gap-3 container mx-auto p-6">
          <div className="flex">
            <Link
              href="/login"
              className="flex items-center px-4 py-2 text-lg font-medium text-black bg-[#FCBA04] hover:bg-[#FDCD49] drop-shadow-lg align-middle rounded-lg transition duration-500">
              Log In
            </Link>
          </div>

          <div className="flex">
            <Link
              href="/signup"
              className="flex items-center px-4 py-2 text-lg font-medium text-black bg-[#FCBA04] hover:bg-[#FDCD49] drop-shadow-lg align-middle rounded-lg transition duration-500">
              Sign Up
            </Link>
          </div>
        </div>)}
      {loggedInUser && (
        <div className="flex col-span-1 mr-36 justify-end gap-3 container mx-auto p-6">
          <div className="flex">
            <button
              onClick={handleClick}
              className="flex items-center px-4 py-2 text-lg font-medium text-black bg-[#FCBA04] hover:bg-[#FDCD49] drop-shadow-lg align-middle rounded-lg transition duration-500">
              Log Out
            </button>
          </div>
        </div>
      )
      }


    </header>
  );
};

export default Header;


// #62A87C mint color

