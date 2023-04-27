'use client'
import React, { useState } from 'react'
import { SafeUser } from '../types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useFavorite from '@/hooks/useFavorite';

interface HeartButtonProps{
    listingId:string;
    currentUser?:SafeUser | null
}

const HeartButton = ({listingId,currentUser}:HeartButtonProps) => {
    const {toggleFavorite,hasFavorited}=useFavorite({listingId,currentUser})

    return (
        <div onClick={toggleFavorite} className='
        relative hover:opacity-80 cursor-pointer
        '>
            {/* <AiOutlineHeart className='fill-white absolute -top-[2px] -left-[2px]' size={26} /> */}
            <AiFillHeart size={26} className={
                hasFavorited?'fill-rose-500':'fill-neutral-500/70'
            }/>
        </div>
    )
}

export default HeartButton