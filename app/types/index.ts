import { Listing, Reservation, User } from "@prisma/client";

export type SafeUser=Omit<
User,'registeredAt'| 'updatedAt' | 'emailVerified'
> & {
    registeredAt:string;
    updatedAt:string; 
    emailVerified:string | null;
};


export type SafeListing=Omit<
    Listing,'createdAt'
> &{
    createdAt:string
};


export type SafeReservation=Omit<
Reservation,'createdAt'|'startDate'|'endDate'|'listing'
> & {
    createdAt:string
    startDate:string
    endDate:string
    listing:SafeListing
}



