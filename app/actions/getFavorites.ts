import getCurrentUser from "./getCurrentUser"
import prisma from '@/app/libs/prismadb'

export default async function getFavorites() {
    try {
        
        const currentUser=await getCurrentUser()
        const favorites=currentUser?.favoriteIds
        if (!currentUser){
            return []
        }
        
        const favoritesListings=await prisma.listing.findMany({
            where:{
                id:{
                    in:[...favorites || []]
                }
            }
        })
    
        const SafeListings=favoritesListings.map((favorite)=>({
            ...favorite,
            createdAt:favorite.createdAt.toISOString()
        }))
    
        return SafeListings
    } catch (error:any) {
        throw new Error(error);
        
        
    }
}