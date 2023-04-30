'use client'
import { SafeListing, SafeUser } from "@/app/types"
import { Reservation } from "@prisma/client"
import { categories } from "../navbar/Category"
import { useMemo } from "react"
import Container from "../Container"
import ListingHead from "./ListingHead"
import ListingInfo from "./ListingInfo"


interface ListingDetailProps{
    reservations?:Reservation[]
    listing:SafeListing &{User:SafeUser}
    currentUser?:SafeUser | null
}  

const ListingDetail = ({listing,currentUser,reservations}:ListingDetailProps) => {

  const category=useMemo(() => {
        return categories.find((c)=>c.label===listing.category)
    }
    , [listing.category])
  return (
    <Container>
      <div className="max-w-screen-lg max-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="
            grid
            grid-cols-1
            md:grid-cols-7
            md:gap-10
            mt-6
          ">
            <ListingInfo
              currentUser={listing.User}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div> 
    </Container>
  )
}

export default ListingDetail


