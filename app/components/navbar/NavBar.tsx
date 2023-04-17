import React from "react";
import Container from "../Container";
import { Content } from "next/font/google";
import Logo from "./Logo";
import Search from "../search/Search";
import UserMenu from "./UserMenu";

const NavBar = () => {
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
          <UserMenu />
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
