import Image from "next/image";
import React from "react";

interface AvatarProps{
  src:string | null
}

const Avatar = ({src}:AvatarProps) => {
  return (
    <Image
      className="rounded-full"
      height="50"
      width="50"
      alt="Avatar"
      src={src?src:"/sasan.jpg"}
    />
  );
};

export default Avatar;
