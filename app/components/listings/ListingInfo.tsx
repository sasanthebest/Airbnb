'use client'
import { SafeUser } from "@/app/types"
import { useMemo } from "react"
import { IconType } from "react-icons"
import { categories } from "../navbar/Category"
import useCountry from "@/hooks/useCountry"
import Avatar from "../avatar/Avatar"
import ListingCategory from "./ListingCategory"
import dynamic from "next/dynamic"

const Map=dynamic(()=>
    import('../Map'),{ssr:false}
)


interface ListingInfoProps{
    currentUser:SafeUser
    category:{icon:IconType,label:string,description:string} | undefined
    locationValue:string
    description:string
    roomCount:number
    guestCount:number
    bathroomCount:number
}

const ListingInfo = ({
    currentUser,category,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue
}:ListingInfoProps) => {
    const {getByValue}=useCountry()
    const cordinates=getByValue(locationValue)?.latlng
    
  return (
    <div className="col-span-4 flex flex-col gap-8 mb-20">
        <div className="flex flex-col gap-2">
            <div className="
                text-xl
                font-semibold
                flex
                flex-row
                items-center
                gap-2
            
            ">
                <div>Hosted by {currentUser.name}</div>
                <Avatar src={currentUser?.image} />
            </div>
            <div className="
                flex
                flex-row
                items-center
                gap-4
                font-light
                text-neutral-500
            ">
                <div>{guestCount} :ظرفیت</div>
                <div>{roomCount} :تعداد اتاق</div>
                <div>{bathroomCount} :تعداد سرویس بهداشتی</div>
            </div>
                <hr />
                {category &&(
                    <ListingCategory
                        icon={category.icon}
                        label={category.label}
                        description={category.description}
                    />
                )}
                <hr />
                <div className="text-lg font-light text-neutral-500">{description}</div>
                <hr />
                <Map center={cordinates}/>
        </div>
    </div>
  )
}

export default ListingInfo