'use client'
import React, { useCallback, useMemo, useState } from 'react'
import Modals from './Modals'
import useSearchModal from '@/hooks/useSearchModal'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { Range, RangeFocus } from 'react-date-range'
import dynamic from 'next/dynamic'
import CountrySeletec, { CountrySelectValue } from '../inputes/CountrySelect'
import qs from 'query-string'
import { formatISO } from 'date-fns'
import Heading from '../Heading'
import Calendar from '../inputes/Calendar'
import Counter from '../inputes/Counter'


enum STEPS{
    LOCATION=0,
    DATE=1,
    INFO=2
}

  const SearchModal = () => {
    const searchModal=useSearchModal()
    const router=useRouter()
    const params=useSearchParams()
    

    const [steps,setSteps]=useState(0)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathRoomCount, setBathRoomCount] = useState(1)
    const [location, setLocation] = useState<CountrySelectValue>()
    const [dateRange, setDateRange] = useState<Range>({
    
        startDate:new Date(),
        endDate:new Date(),
        key:'selection'
    })
    const Map= useMemo(() => dynamic(()=>import( '../Map'),{ssr:false}),[location])
    
    const onBack=useCallback(() => {
        setSteps((value)=>value-1)
      },
      [steps],
    )
    const onNext=useCallback(() => {
        setSteps((value)=>value+1)
      },
      [steps],
    )

    const onSubmit=useCallback(async()=>{
      if (steps!==STEPS.INFO){
        return onNext()
      }

      let currentQuery={}

      if (params){
        currentQuery=qs.parse(params.toString())
      }
      
      const updatedQuery:any={
          ...currentQuery,  
          locationValue:location?.value,
          guestCount,
          roomCount,
          bathRoomCount,
        }
      
      
     if (dateRange.startDate){
                updatedQuery.startDate=formatISO(dateRange.startDate)
      
     }
      if (dateRange.endDate){
                updatedQuery.endDate=formatISO(dateRange.endDate)
       }
      
    const url=qs.stringifyUrl({
      url:'/',
      query:updatedQuery
    },{skipNull:true})
      
     setSteps(STEPS.LOCATION)
      searchModal.onClose()
     router.push(url)
    } ,[
      steps,
      searchModal,,
      location,
      router,
      guestCount,
      roomCount,
      bathRoomCount,
      dateRange,
      onNext,
      params,
    ])

    const actionLabel=useMemo(() => {
      if (steps===STEPS.INFO){
        return 'جستجو'
      }
      return 'بعدی'
    }
    , [steps])
    
    const secondaryActionLabel=useMemo(() => {
        if(steps===STEPS.LOCATION){
          return undefined
        }
        return 'قبلی'
      }

    , [steps])

  let bodyContent=(
        <div className='flex flex-col gap-8'>
          <Heading
            center
            title='کجا دوست داری بری؟'
            subtitle='بهترین جارو انتخاب کن'
          />
          <CountrySeletec
            value={location}
            onChange={value=>setLocation(value as CountrySelectValue)}
          />
          <hr />
          <Map center={location?.latlng}/>

        </div>
      )

    if (steps===STEPS.DATE){
      bodyContent=(
      <div className='flex flex-col gap-8'>
        <Heading title='کی میخوای سفر کنی؟'/>
        <Calendar value={dateRange} onChange={(value)=> setDateRange(value.selection)}/>

      </div>)
    }
    if (steps===STEPS.INFO){
      bodyContent=(
      <div className='flex flex-col gap-8'>
        <Heading
          title='اطلاعات منزل'

        />
        <Counter
          title='مهمان'
          subtitle='چند نفر هستید؟'
          value={guestCount}
          onChange={(value)=>setGuestCount(value)}
        />
        <Counter
          title='اتاق'
          subtitle='چندتا اتاق نیاز دارین؟'
          value={roomCount}
          onChange={(value)=>setRoomCount(value)}
        />
        <Counter
          title='سرویس بهداشتی'
          subtitle='چند تا سرویس بهداشتی نیاز دارین'
          value={bathRoomCount}
          onChange={(value)=>setBathRoomCount(value)}
        />

        
      </div>)
    }
  
  return (
    <Modals 
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title='فیلتر ها'
        actionLabel={actionLabel}
        secondaryAction={steps===STEPS.LOCATION?undefined:onBack}
        body={bodyContent}
        secondaryActionLabel={secondaryActionLabel}
    />
  )
}

export default SearchModal