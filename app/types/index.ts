import { Listing, User } from "@prisma/client";

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