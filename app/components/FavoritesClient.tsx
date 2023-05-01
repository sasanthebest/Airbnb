'use client'
import { useCallback, useState } from "react";
import { SafeUser, SafeReservation, SafeListing } from "../types"
import ClientOnly from "./ClientOnly"
import Container from "./Container";
import Heading from "./Heading"
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import TripsCard from "./TripsCard";
import ListingsCard from "./listings/ListingsCard";
import getFavorites from "../actions/getFavorites";

interface FavoritesClientProps{
    favorites:SafeListing[];
    currentUser?:SafeUser | null;
}

const FavoritesClient =({
  favorites=[],
  currentUser
}:FavoritesClientProps) => {
  const router=useRouter()

  return (
    <Container>
      <Heading title="لیست علاقه مندی ها" subtitle="خونه هایی که مورد علاقه ی شما هستن" center/>
      <div className="
        mt-10
        mb-10
        gap-8
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
      ">
        {favorites.map((favorite)=>
          ( <ListingsCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />)
          )}
      </div>
    </Container>
  )
}

export default FavoritesClient