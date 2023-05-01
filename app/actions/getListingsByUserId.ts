import getCurrentUser from "./getCurrentUser";
import prisma from '@/app/libs/prismadb'

export async function getListingsByUserId() {
    const currentUser=await getCurrentUser()

    if (!currentUser){
        return []
    }

    const listings=await prisma.listing.findMany({
        where:{
            userId:currentUser.id
        }
    })

    const safeListing=listings.map((listing)=>({
        ...listing,createdAt:listing.createdAt.toISOString()
    }))

    return safeListing
}