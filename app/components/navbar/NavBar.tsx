import React from "react";
import Container from "../Container";
import { Content } from "next/font/google";
import Logo from "./Logo";
import Search from "../search/Search";
import UserMenu from "./UserMenu";
import {User} from '@prisma/client'
interface NavbarProps{
  currentUser?:User | null
}

const NavBar = ({currentUser}:NavbarProps) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py4 border-b-[1px]"></div>
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
  );
};

export default NavBar;
