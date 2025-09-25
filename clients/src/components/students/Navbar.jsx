import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useClerk , UserButton, SignUpButton, useAuth } from "@clerk/clerk-react";
import { AppContext } from "../../contexts/Context";
import API from "../../api/axios";
import { toast } from "react-toastify";
const Navbar = () => {
  const location = useLocation();
  const {getToken}=useAuth()
  const isCourseList = location.pathname.includes("/course-list");
  const navigate= useNavigate()
  const { isSignedIn } = useClerk();
  const {isEducater,isSetEducater} = useContext(AppContext)
  // become Educator
  const becomeEducator=async()=>{
    try {
      if(isEducater){
        navigate("/educater")
        return
      }
      const token=await getToken()
      const {data}= await API.get("educator/update-role",{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        isSetEducater(true)
        toast.success(data.message)
      }else{
        toast(data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14  py-4 lg:px-36 border-b border-gray-500 ${
        isCourseList ? "bg-white" : "bg-cyan-100/70"
      } `}
    >
      <img className="w-28 lg:w-32 cursor-pointer" src={assets.logo} onClick={()=>navigate("/")} />
      <div className="hidden md:flex items-center gap-5 text-gray-500 ">
        {isSignedIn &&<div className="flex items-center gap-5">
          <button onClick={becomeEducator}>{isEducater?"Educater Dashboard":"Become Educaters"}</button> 
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
          <button onClick={becomeEducator}>{isEducater?"Educater Dashboard":"Become Educater"}</button> |
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
