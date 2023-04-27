import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'


interface IParams{
    listingId:string
}

export async function POST(request:Request,{params}:{params:IParams}) {

    const currentUser=await getCurrentUser()
    if (!currentUser){
        return NextResponse.error()
    }
    if (!params.listingId || typeof params.listingId != 'string'){
        return new Error('id is not valid')
    }
 

    let favoriteIds=[...(currentUser.favoriteIds) || []]
    favoriteIds.push(params.listingId)
    const updatedUser=await prisma.user.update(
        
        {
            where:{
                id:currentUser.id
            },
        data:{
            favoriteIds
        }
    })
    return NextResponse.json(updatedUser)
}



export async function DELETE(request:Request,{params}:{params:IParams}) {
    const currentUser=await getCurrentUser()
    if (!currentUser){
        return NextResponse.error()

    }
    if (!params.listingId || typeof params.listingId != 'string'){
        return Error('Id is not valid')
    }

    let favoriteIds=[...(currentUser.favoriteIds)|| []]
    favoriteIds=favoriteIds.filter((id)=>id!=params.listingId)
    const updatedUser=await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIds
        }

    })

    return NextResponse.json(updatedUser)
    
}