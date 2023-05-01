import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'



interface IParams{
    reservationId:string
}
export async function DELETE(request:Request,{params}:{params:IParams}) {
    try {
        
        const reservation=prisma.reservation.findUnique({
            where:{
                id:params.reservationId
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
        return NextResponse.json()
    } catch (error) {
        
    }
    
}