import { Reservation } from "@prisma/client";
import prisma from '@/app/libs/prismadb'
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(request:Request) {
    const currentUser=await getCurrentUser()
    if (!currentUser){
        return NextResponse.error()
    }
    const body=await request.json()
    const {listingId,startDate,endDate,totalPrice}=body
    if (!listingId || !startDate || !endDate|| !totalPrice){
        return NextResponse.error()
    }

    const listing=await prisma.listing.update(
        {
            where:{
                id:listingId
            },
            data:{
                reservations:{
                    create:{
                        userId:currentUser.id,
                        startDate:startDate,
                        endDate:endDate,
                        totalPrice:totalPrice,
                        
                    }
                }
            }
            

        }
    )
    return NextResponse.json(listing)
}


