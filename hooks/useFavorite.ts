import { SafeUser } from '@/app/types'
import React, { useCallback, useMemo } from 'react'
import useLoginModal from './useLoginModal'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface IUseFavorite{
    listingId:string
    currentUser?:SafeUser | null

}

const useFavorite = ({listingId,currentUser}:IUseFavorite) => {

    const loginModal=useLoginModal()
    const router=useRouter()

    const hasFavorited=useMemo(() => {
            const favorites=currentUser?.favoriteIds || null
            return favorites?.includes(listingId)
        }
    
    , [currentUser,listingId]) 

    const toggleFavorite=useCallback(
        async (e:React.MouseEvent<HTMLDivElement>)=>{
            e.stopPropagation()
        if (!currentUser){
            toast.success('برای افزودن به علاقه مندی ها ابتدا وارد حساب کاربری شوید')
            return loginModal.onOpen()
        }
        
        try {
            
            if (!hasFavorited){
                await  axios.post(`/api/favorites/${listingId}`)
                .then((res)=>{
                    toast.success('به لیست علاقه مندی ها افزده شد')                    
                })
            }else{

                await axios.delete(`/api/favorites/${listingId}`)
                .then((res)=>{
                    toast.success('از لیست علاقه مندی ها حذف شد')
                })
            }
          
            router.refresh()
        } catch (error) {
            toast.error('مشکلی هست')
        }
        
    },[listingId,currentUser,hasFavorited,loginModal,router])


    return {toggleFavorite,hasFavorited}
}

export default useFavorite