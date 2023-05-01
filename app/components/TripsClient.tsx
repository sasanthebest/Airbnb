'use client'
import { useCallback, useState } from "react";
import { SafeUser, SafeReservation } from "../types"
import ClientOnly from "./ClientOnly"
import Container from "./Container";
import Heading from "./Heading"
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import TripsCard from "./TripsCard";
import ListingsCard from "./listings/ListingsCard";

interface TripsClientProps{
    reservations:SafeReservation[];
    currentUser?:SafeUser | null;
}

const TripsClint = ({
  reservations=[],
  currentUser
}:TripsClientProps) => {
  const router=useRouter()
  const [deletingId,setDeletingId]=useState('')
  
  const onCancel=useCallback(
    (id:string) => {
      setDeletingId(id)


    axios.delete(`/api/reservation/${id}`)
      .then((res)=>{toast.success('رزرو شما با موفقیت کنسل شد')})
      .catch((err)=>toast.error('مشکلی هست دوباره تلاش کنید.'))
      .finally(()=>{
        router.refresh()
        setDeletingId('')
      })
    },
    [router],
  )
  

  return (
    <Container>
      <Heading title="سفرها" subtitle="جاهایی که قراره سفر کنی" center/>
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
        {reservations.map((reservation)=>
          ( <ListingsCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId===reservation.id}
            actionLabel="کنسل"
            currentUser={currentUser}
          />)
          )}
      </div>
    </Container>
  )
}

export default TripsClint