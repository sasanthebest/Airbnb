'use client'
import React, { useState } from 'react'
import { SafeUser } from '../types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps{
    listingId:string;
    currentUser?:SafeUser | null
}
const isFavorited=false
const HeartButton = ({listingId,currentUser}:HeartButtonProps) => {
const toggleFavorite=()=>{console.log('liked')}
    
    return (
        <div onClick={toggleFavorite} className='
        relative hover:opacity-80 cursor-pointer
        '>
            <AiOutlineHeart className='fill-white absolute -top-[2px] -left-[2px]' size={26} />
            <AiFillHeart size={26} className={
                isFavorited?'fill-rose-500':'fill-neutral-500/70'
            }/>
        </div>
    )
}

export default HeartButton