'use client'
import { useCallback, useState } from "react";
import { SafeListing, SafeUser } from "../types";
import Container from "./Container";
import Heading from "./Heading";
import ListingsCard from "./listings/ListingsCard";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


interface ListingsClientProps{
    listings:SafeListing[];
    currentUser?:SafeUser| null;
}

const ListingsClient = ({listings,currentUser}:ListingsClientProps) => {
    const router=useRouter()
    const [deletingId,setDeletingId]=useState('')

    const onDelete=useCallback(
        (id:string) => {
          setDeletingId(id)
    
        axios.delete(`/api/listings/${id}`)
          .then((res)=>{toast.success('منزل شما با موفقیت حذف شد')})
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
          <Heading title="منزل های شما" subtitle="منزل هایی که برای میزبانی ثبت کردین" center/>
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
            {listings.map((listing)=>
                ( <ListingsCard
                    key={listing.id}
                    data={listing}
                    actionId={listing.id}
                    onAction={onDelete}
                    disabled={deletingId===listing.id}
                    actionLabel="حذف"
                    currentUser={currentUser}
                />)
          )}
          </div>
        </Container>
      )
}

export default ListingsClient