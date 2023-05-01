import useLoginModal from "@/hooks/useLoginModal"
import getCurrentUser from "../actions/getCurrentUser"
import ClientOnly from "../components/ClientOnly"
import getReservation from "../actions/getReservations"
import { SafeReservation } from "../types"
import EmptyState from "../components/EmptyState"
import LoginModal from "../components/modals/LoginModal"
import Button from "../components/Button"
import TripsClient from "../components/TripsClient"
import FavoritesClient from "../components/FavoritesClient"
import getFavorites from "../actions/getFavorites"



const page=async()=>{
    const currentUser=await getCurrentUser()
    const favorites=await getFavorites()
    if (!currentUser){
        return (
            <ClientOnly>
                <EmptyState subtitle="برای دیدن مورد علاقه ها لطفا به حساب کاربریتون وارد بشین"/>
                
            </ClientOnly>
        )}

    if (favorites.length===0){
        return (
            <ClientOnly>
                <EmptyState subtitle="برای افزودن به مورد علاقه ها از دکمه ی قلب در صفحه ی آگهی استفاده کنید"/>
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <div>
                <FavoritesClient favorites={favorites} currentUser={currentUser} />
            </div>
        </ClientOnly>
    )
}

export default page