import '@/app/libs/prismadb'


export async function getListings() {
    try {
        const listings=await prisma?.listing.findMany()
        const safeListings=listings?.map((listing)=>({
            ...listing,createdAt:listing.createdAt.toISOString(),
        }))
        return safeListings
    } catch (error:any) {
        throw new Error(error);
        
    }
}