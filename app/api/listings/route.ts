import { NextResponse } from "next/server"
import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from '@/app/libs/prismadb'

export async function POST(request:Request) {
    const user=await getCurrentUser()
    if (!user) {
        return NextResponse.error()
    }
    const body=await request.json()

    const {title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price}=body


    Object.keys(body).forEach((value)=>{
        if (!body[value]){
            return NextResponse.error();
        }
    })

    const listing=await prisma.listing.create({
            data:{
                title,
                description,
                imageSrc,
                category,
                roomCount,
                bathroomCount,
                guestCount,
                locationValue:location.value,
                userId:user.id,
                price:parseInt(price,10)
            }});

    return NextResponse.json(listing)
    
}