import '@/app/libs/prismadb'

export interface IListingsParams{
    userId?:string;
    guestCount?:number;
    roomCount?:number;
    bathRoomCount?:number
    startDate?:string;
    endDate?:string;
    locationValue?:string;
    category?:string
}
// {
//     userId,
//     guestCount,
//     roomCount,
//     bathRoomCount,
//     startDate,
//     endDate,
//     locationValue,
//     category
// }

export async function getListings() {

    try {

        let query:any={}
  
        // if (category){
        //     query.category=category
        // }
        // if (locationValue){
        //     query.locationValue=locationValue
        // }
        // if (roomCount){
        //     query.roomCount={gte:+roomCount}
        // }
        // if (bathRoomCount){
        //     query.bathRoomCount={gte:+bathRoomCount}
        // }
        // if (guestCount){
        //     query.guestCount={gte:+guestCount}
        // }
        // if (startDate && endDate){
        //     query.NOT={
        //         reservations:{
        //             some:{
        //                 OR:[
        //                     {
        //                         endDate:{gte:startDate},
        //                         startDate:{lte:startDate}
        //                     },
        //                     {
        //                         startDate:{lte:endDate},
        //                         endDate:{gte:endDate}
        //                     }

        //                 ]
        //             }
        //         }
        //     }
        // }


        const listings=await prisma?.listing.findMany({where:query,orderBy:{createdAt:'desc'}})


        const safeListings=listings?.map((listing)=>({
            ...listing,createdAt:listing.createdAt.toISOString(),
        }))
        return safeListings
    } catch (error:any) {
        return null
        
    }
}