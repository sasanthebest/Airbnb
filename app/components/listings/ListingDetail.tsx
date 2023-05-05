'use client'
import { SafeListing, SafeUser, SafeReservation } from "@/app/types"
import { Reservation } from "@prisma/client"
import { categories } from "../navbar/Category"
import { useCallback, useEffect, useMemo, useState } from "react"
import Container from "../Container"
import ListingHead from "./ListingHead"
import ListingInfo from "./ListingInfo"
import useLoginModal from "@/hooks/useLoginModal"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import axios from "axios"
import { data } from "autoprefixer"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import ListingReservation from "./ListingReservation"
import { Range } from "react-date-range"


const initialDateRange={
  startDate:new Date(),
  endDate:new Date(),
  key:'selection',
}

interface ListingDetailProps{
    reservations?:SafeReservation[]
    listing:SafeListing & {User:SafeUser}
    currentUser?:SafeUser | null
}  

const ListingDetail = ({listing,currentUser,reservations=[]}:ListingDetailProps) => {

  const loginModal=useLoginModal()
  const router=useRouter()
  const [isLoading,setIsLoading]=useState(false)
  const [totalPrice,setTotalPrice]=useState(listing.price)
  const [dateRange,setDateRange]=useState<Range>(initialDateRange)

  


  const disabledDates=useMemo(() => {
    let dates: Date[]=[];

    reservations.forEach((reservation)=>{
      const range:Date[]=eachDayOfInterval({
        start:new Date(reservation.startDate),
        end:new Date(reservation.endDate)
      })

      dates=[...dates,...range]
    })
    return dates
  }
   , [reservations])



  const category=useMemo(() => {
        return categories.find((c)=>c.label===listing.category)
    }
    , [listing.category])

  

  const onCreateReservation=useCallback(() => {

      if (!currentUser){
        return loginModal.onOpen()
      }

      setIsLoading(true)

      const reservationData={
          listingId:listing.id,
          startDate:dateRange.startDate,  
          endDate:dateRange.endDate,
          totalPrice:totalPrice
      }

      axios.post('/api/reservation',reservationData)
      .then((res)=>{
        toast.success('با موفقیت رزرو شد')
        setDateRange(initialDateRange)
        router.push('/trips')
      })
      .catch((err)=>{
        toast.error('خطا!!')
      })  
      .finally(()=>{
        setIsLoading(false)
        router.refresh()
        }
      )
    },
    [totalPrice,loginModal,dateRange,listing?.id,currentUser,router],
  )


  useEffect(() => {
    if(dateRange.startDate && dateRange.endDate){

      const dayCount=differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )
      if (dayCount && listing.price){
        setTotalPrice(dayCount*listing.price)
      }else{
        setTotalPrice(listing.price)
      }

    }
    

  }, [dateRange,listing.price])

  if (!currentUser){
    return loginModal.onOpen()
  }
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
            
            <div className="
              order-first
              mb-10
              md:order-last
              md:col-span-3
            "
            >
              <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              reservations={reservations}
              onChangeDate={(value)=>setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
              />
            </div>

          </div>
        </div>
      </div> 
    </Container>

  )
}

export default ListingDetail


