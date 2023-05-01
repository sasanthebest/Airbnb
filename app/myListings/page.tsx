import getCurrentUser from "../actions/getCurrentUser"
import { getListingsByUserId } from "../actions/getListingsByUserId"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import ListingsClient from "../components/ListingsClient"



const page = async() => {
    const currentUser=await getCurrentUser()
    const userListings=await getListingsByUserId()
    if (!currentUser){
        return (
            <ClientOnly>
                <EmptyState subtitle="برای دیدن خونه هاتون لطفا به حساب کاربریتون وارد بشین"/>
            </ClientOnly>
        )
    }
    if(userListings.length===0){
        return (
          <ClientOnly>
              <EmptyState subtitle="شما منزلی رو برای میزبانی ثبت نکردین"/>
          </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <ListingsClient listings={userListings} currentUser={currentUser}/>
        </ClientOnly>
    )
}

export default page