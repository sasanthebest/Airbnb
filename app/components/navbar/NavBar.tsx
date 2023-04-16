import React from "react";
import Container from "../Container";
import { Content } from "next/font/google";
import Logo from "./Logo";

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
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
