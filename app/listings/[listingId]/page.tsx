import getCurrentUser from "@/app/actions/getCurrentUser"
import  getListingById from "@/app/actions/getListingById"
import getReservation from "@/app/actions/getReservations"
import ClientOnly from "@/app/components/ClientOnly"
import EmptyState from "@/app/components/EmptyState"
import ListingDetail from "@/app/components/listings/ListingDetail"

interface IParams{
  listingId?:string,
}
const page= async({params}:{params:IParams}) => {
  const listing=await getListingById(params)
  const reservations=await getReservation(params)
  const currentUser = await getCurrentUser()

  if (!listing){
    return (
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )
  }

  return (
      <ClientOnly>
        <ListingDetail
          reservations={reservations}
          listing={listing}
          currentUser={currentUser}
        />
      </ClientOnly>
  )
}

export default page