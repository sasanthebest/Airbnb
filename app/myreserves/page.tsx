import getCurrentUser from "../actions/getCurrentUser"
import getReservation from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import ReservationsClient from "../components/ReservationsClient"



const page = async () => {
    const currentUser=await getCurrentUser()
    const reservations=await getReservation({authorId:currentUser?.id})
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState subtitle="برای دیدن رزروهاتون لطفا وارد حساب کاربریتون بشین"/>
            </ClientOnly>
        )
    }
    if (reservations.length===0){
        return (
            <ClientOnly>
                <EmptyState subtitle="برای خونه های شما رزروی ثبت نشده"/>
            </ClientOnly>
        )
    
    }
    return (
        <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default page