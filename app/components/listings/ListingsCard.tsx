'use client'
import { SafeUser } from "@/app/types"
import { Listing, Reservation } from "@prisma/client"
import { format } from "date-fns"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import HeartButton from "../HeartButton"
import useCountry from "@/hooks/useCountry"
import Button from "../Button"


interface ListingsCardProps{
    data:Listing
    reservation?:Reservation
    currentUser?:SafeUser | null
    onAction?:(id:string)=>void
    disabled?:boolean
    actionLabel?:string
    actionId?:string
    
}

const ListingsCard = ({
  data,
  reservation,
  currentUser,
  disabled,
  actionId,
  actionLabel,
  onAction}:ListingsCardProps) => {
    const router=useRouter()
    const {getByValue}=useCountry()
    const location=getByValue(data.locationValue)

  const handleCancel=()=>{
    
  }

  const reservationDate =useMemo(() => {
    if (!reservation)return null;
    const start=new Date(reservation.startDate)
    const end=new Date(reservation.endDate)
    return `${format(start,'PP')}-${format(end,'pp')}`
  }



  
  , [reservation])

  const price=useMemo(()=>{
    if(reservation){
      return reservation.totalPrice
    }
    return data.price
  },[reservation])


  return (

    <div onClick={()=>router.push(`/listings/${data.id}`)} className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
        " >
          <Image fill src={'/home.jpg'} alt={data?.title}
          className="
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
          "/>
          <div className="absolute top-3 left-3">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
          </div>
          <div className="font-semibold text-lg">
            {location?.region},{location?.label}
          </div>
          <div className="font-light text-neutral-500">
            {reservationDate || data.category}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">
              {price}
            </div>
            {!reservation && (
              <div className="font-light">هر شب از</div>
            )}
          </div>
          <div >
            {onAction && actionLabel &&(
              <Button disabled={disabled} small label={actionLabel} onClick={handleCancel}/>
            )}
          </div>

          </div> 
    </div>
  )
}

export default ListingsCard