import useLoginModal from "@/hooks/useLoginModal"
import getCurrentUser from "../actions/getCurrentUser"
import ClientOnly from "../components/ClientOnly"
import getReservation from "../actions/getReservations"
import { SafeReservation } from "../types"
import EmptyState from "../components/EmptyState"
import LoginModal from "../components/modals/LoginModal"
import Button from "../components/Button"
import TripsClient from "../components/TripsClient"



const page=async()=>{
    const currentUser=await getCurrentUser()
    const reservations=await getReservation({userId:currentUser?.id})
    if (!currentUser){
        return (
            <ClientOnly>
                <EmptyState subtitle="برای دیدن موارد رزرو شده لطفا به حساب کاربری وارد شوید"/>
            </ClientOnly>
        )}

    if (reservations.length===0){
        return (
            <ClientOnly>
                <EmptyState subtitle="!!هیچ خونه ای رزرو نکردی"/>
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <div>
                <TripsClient reservations={reservations} currentUser={currentUser} />
            </div>
        </ClientOnly>
    )
}

export default page