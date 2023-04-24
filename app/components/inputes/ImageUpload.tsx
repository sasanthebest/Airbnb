'use client'
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React from 'react'
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps{
  onChange:(value:string)=>void
  value:string;
}

const ImageUpload = ({onChange,value}:ImageUploadProps) => {
  return (
    <CldUploadWidget  
     onUpload={()=>{}}
     uploadPreset=''
     options={{
      maxFiles:1
     }}

     >
      {({open})=>{
        return(
          <div onClick={()=>open?.()}
                className='
                      relative
                      cursor-pointer
                      hover:opacity-70
                      transition
                      border-dashed
                      border-2
                      p-20
                      border-neutral-300
                      flex
                      flex-col
                      justify-center
                      items-center
                      gap-4
                      text-neutral-600
                    '
          >
            <TbPhotoPlus size={35 }/>
            <div className='font-normal text-lg'>ثبت عکس</div>
            <div>

              {value &&(
                <div className='absolute inset-0 w-full h-full'>

                  <Image alt='uploaded' fill style={{objectFit:'cover'}}
                  src={value} /> 
                </div>
              )}
            </div>
          </div>
        )

      }} 
      </CldUploadWidget>
  )
}

export default ImageUpload