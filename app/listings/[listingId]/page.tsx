import getCurrentUser from "@/app/actions/getCurrentUser"
import  getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly"
import EmptyState from "@/app/components/EmptyState"
import ListingDetail from "@/app/components/listings/ListingDetail"

interface IParams{
  listingId?:string,
}
const page= async({params}:{params:IParams}) => {
  const listing=await getListingById(params)
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
          listing={listing}
          currentUser={currentUser}
        />
      </ClientOnly>
  )
}

export default page