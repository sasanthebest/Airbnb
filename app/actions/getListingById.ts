import prisma from '@/app/libs/prismadb'

interface IParams{
    listingId?:string
}
export default async function getListingById(params:IParams) {

    try {
        const listing=await prisma.listing.findUnique({
            where:{
                id:params.listingId
            },
            include:{
                User:true
            }
        })
        if (!listing){
            return null
        }
        const safeListing={
            ...listing,
            createdAt:listing.createdAt.toISOString(),
            User:{
                ...listing.User,
                createdAt:listing.User?.registeredAt.toISOString(),
                emailVerified:listing.User?.emailVerified?.toISOString(),
                updatedAt:listing.User?.updatedAt.toISOString() || null 
            }
        }
        return safeListing
    } catch (error:any) {
        throw new Error(error)
    }
    
}