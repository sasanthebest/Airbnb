import { User } from "@prisma/client";

export type SafeUser=Omit<
User,'registeredAt'| 'updatedAt' | 'emailVerified'
> & {
    registeredAt:string;
    updatedAt:string; 
    emailVerified:string | null;
};