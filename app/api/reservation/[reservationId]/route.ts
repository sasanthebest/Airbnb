import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'



interface IParams{
    reservationId?:string
}
export async function DELETE(
    request:Request,
    {params}:{params:IParams}) {
        console.log('deletingId',params.reservationId)

        const currentUser=await getCurrentUser()
        if (!currentUser){
            return NextResponse.error()
        }
        if (!params.reservationId || typeof params.reservationId!=='string'){
            throw new Error("invalid Id");
        }
        const reservation=await prisma.reservation.deleteMany({
            where:{
                id:params.reservationId,
                OR:[
                    {userId:currentUser.id},
                    {Listing:{userId:currentUser.id}}
                ]
            }
        })
        if(!reservation){
            return NextResponse.error()
        }
        prisma.reservation.delete({
            where:{
                id:params.reservationId
            },
        })
        return NextResponse.json(reservation)

    
}