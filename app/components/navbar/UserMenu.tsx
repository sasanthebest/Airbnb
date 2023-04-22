"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar/Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import LoginModal from "../modals/LoginModal";

interface UserMenuProps{
  currentUser?:SafeUser| null
}

const UserMenu = ({currentUser}:UserMenuProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const router=useRouter()
  

  const onRent=useCallback(()=>{
    if (!currentUser){
      return loginModal.onOpen()
    }
    // open rent modal
    
  },[currentUser,LoginModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
        hidden
        md:block
        text-sm
        font-semibold
        py-3
        px-4
        rounded-full
        hover:bg-neutral-100
        transition
        cursor-pointer

        "
        >
          Airbnb your home
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="
          p-4
          md:py-1
          md:px-2
          boder-[1px]
          border-neutral-200
          flex
          flex-row
          gap-3
          rounded-full
          cursor-pointer
          hover:shadow-md
          transition
        "
        >
          <AiOutlineMenu />
        </div>
        <div className="hidden md:block">
          <Avatar />
        </div>
      </div>

      {isOpen && (
        <div
          className="
          absolute
          rounded-xl
          shadow-md
          w-[40vw]
          md:w-3/4
          bg-white
          overflow-hidden
          right-0
          top-12
          text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">

            {currentUser ?(
              <>
              <MenuItem label="سفر های من" onClick={loginModal.onOpen} />
              <MenuItem label="رزرو های من" onClick={()=>{}} />
              <MenuItem label="مورد علاقه های من" onClick={()=>{}} />
              <MenuItem label="خانه های من " onClick={()=>{}} />
              <MenuItem label="خروج" onClick={()=>signOut()} />
              </>
            ):
            (<>
              <MenuItem label="login" onClick={loginModal.onOpen} />
              <MenuItem label="Sign up" onClick={registerModal.onOpen} />
            </>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
