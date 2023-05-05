'use client'
import React from "react";
import Container from "../Container";
import { Content } from "next/font/google";
import Logo from "./Logo";
import Search from "../search/Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Category from "./Category";
import useSearchModal from "@/hooks/useSearchModal";
interface NavbarProps{
  currentUser?:SafeUser | null
}

const NavBar = ({currentUser}:NavbarProps) => {
  
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py4 border-b-[1px]">
      <Container>
        <div
          className="
                flex
                flex-row
                items-center
                justify-between
                gap-3
                md:gap-0
                    "
        >
          <Logo />
          <Search />
          <UserMenu  currentUser={currentUser} />
        </div>
      </Container>
      </div>
      <Category/>
      </div>

  );
};

export default NavBar;
