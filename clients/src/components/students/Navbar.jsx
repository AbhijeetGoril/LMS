import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useClerk , UserButton, SignUpButton } from "@clerk/clerk-react";
import { AppContext } from "../../contexts/Context";
const Navbar = () => {
  const location = useLocation();
  
  const isCourseList = location.pathname.includes("/course-list");
  const navigate= useNavigate()
  const { isSignedIn } = useClerk();
  const {isEducater} = useContext(AppContext)
  
  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14  py-4 lg:px-36 border-b border-gray-500 ${
        isCourseList ? "bg-white" : "bg-cyan-100/70"
      } `}
    >
      <img className="w-28 lg:w-32 cursor-pointer" src={assets.logo} onClick={()=>navigate("/")} />
      <div className="hidden md:flex items-center gap-5 text-gray-500 ">
        {isSignedIn &&<div className="flex items-center gap-5">
          <button onClick={()=>{navigate("/educater")}}>{isEducater?"Educater Dashboard":"Become Educater"}</button> 
          |
          <Link to="/my-enrollmants"> My Enrollmants</Link>
        </div>}

        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignUpButton mode="modal">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full">
              Create Account
            </button>
          </SignUpButton>
        )}
      </div>

      {/* For moblie screen */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-sm">
      {isSignedIn &&<div className="flex items-center gap-5">
          <button onClick={()=>{navigate("/educater")}}>{isEducater?"Educater Dashboard":"Become Educater"}</button> |
          <Link to="/my-enrollmants"> My Enrollmants</Link>
        </div>}
        </div>
       {isSignedIn?<UserButton/>:<SignUpButton mode="modal">
        <button >
          <img src={assets.user_icon} alt=""></img>
        </button>
        </SignUpButton>
        }
      </div>
    </div>
  );
};

export default Navbar;
