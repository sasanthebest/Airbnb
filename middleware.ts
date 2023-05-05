export {default} from 'next-auth/middleware'

export const config={
    matcher:[
        '/trips',
        '/myreserves',
        '/myListings',
        '/favorites',
    ]
}