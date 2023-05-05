'use client'

import React, { useMemo, useState } from 'react'
import Modals from './Modals'
import useRentModal from '@/hooks/useRentModal'
import Heading from '../Heading'
import { categories } from '../navbar/Category'
import CategoryInput from '../inputes/CategoryInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../inputes/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../inputes/Counter'
import ImageUpload from '../inputes/ImageUpload'
import Inpute from '../inputes/Inpute'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'


enum STEPS{
    CATEGORY=0,
    LOCATION=1,
    INFO=2,
    IMAGES=3,
    DESCRIPTION=4,
    PRICE=5,
}

const RentModal = () => {
    const [step,setStep]=useState(STEPS.CATEGORY)
    const rentModal=useRentModal()
    const router=useRouter()

    const {
        reset,
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors
        }
    }=useForm<FieldValues>({
        defaultValues:{
            category:'',
            location:null,
            guestCount:1,
            roomCount:1,
            bathroomCount:1,
            price:1000,
            imageSrc:'',
            title:'',
            description:''
        }
    })


    const category=watch('category')
    const location=watch('location')
    const guestCount=watch('guestCount')
    const roomCount=watch('roomCount')
    const bathroomCount=watch('bathroomCount')
    const imageSrc=watch('imageSrc')
    const price=watch('price')
    const Map=useMemo(() => dynamic(()=>import('../Map'),{ssr:false}), [])
    const [isLoading,setIsLoading]=useState(false)



    const setCustomValue=(id:string,value:any)=>{
        setValue(id,value,{
            shouldValidate:true,
            shouldDirty:true,
            shouldTouch:true
        })
    }
    
    const onBack=()=>{
        setStep((value)=>value -1)
    }
    const onNext=()=>{
        setStep((value)=>value+1)}
   
    const actionLabel=useMemo(()=>{
        if (step===STEPS.PRICE){
            return 'ثبت'
        }
        return 'بعدی'
    },[step])

    const secondaryActionLabel=useMemo(() => {
        if (step===STEPS.CATEGORY)
        {return undefined}
        return 'قبلی'
        }, [step])

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        if (step!==STEPS.PRICE ){
            return onNext()
        }
        setIsLoading(true)
        axios.post('/api/listings',data)
        .then(()=>{
            toast.success('منزل شما با موفقیت ثبت شد')
            router.refresh()
            reset()
            setStep(STEPS.CATEGORY)
            rentModal.onClose()

        })
        .catch(()=>toast.error('یه لحظه وایس یه جارو ریدیم!! یه بار دیگه تلاش کن'))
        .finally(()=>setIsLoading(false))
    }

    let bodyContent=(
        <div className='flex flex-col gap-8'>
            <Heading
            title='کدام نوع اقامتگاه مد نظر شماست؟'
            subtitle='.یکی از انواع اقامت گاه های زیر را انتخاب کنید'                
            />
            <div
                className='
                    grid
                    grid-cols-1
                    md:grid-cols-2 
                    gap-3
                    max-g-[50vh]
                    overflow-y-auto
                '   
            >{categories.map((item)=>(
                <div key={item.label} className='col-span-1 '>
                    <CategoryInput
                        onClick={(category)=>setCustomValue('category',category)}
                        icon={item.icon}
                        label={item.label}
                        selected={category===item.label}
                    />
                    </div>
            ))
            }</div>
            
            </div>
    )

    if (step===STEPS.LOCATION){
        bodyContent=(
            <div className='flex flex-col gap-8'>
                <Heading
                title='موقعیت مکانی'
                subtitle='یه مکان انتخاب کن'
                center
                />
                <CountrySelect value={location} onChange={(value)=>setCustomValue('location',value)} />
                <Map center={location?.latlng}/>
                </div>
        )
    }


    if (step===STEPS.INFO){
        bodyContent=(
            <div className=' flex flex-col gap-8'>

                <Heading 
                title='اطلاعات منزل'
                subtitle='خونتون چه امکانات رفاهی داره؟'
                center
                />

                <Counter 
                onChange={(value)=>setCustomValue('guestCount',value)}
                title='ظرفیت منزل'
                subtitle='چند نفر مهمون قبول میکنین؟'
                value={guestCount} />
                <hr />
                <Counter 
                onChange={(value)=>setCustomValue('roomCount',value)}
                title='تعداد اتاق ها'
                subtitle='خونتون چند خابه است؟'
                value={roomCount} />
                <hr />
                <Counter 
                onChange={(value)=>setCustomValue('bathroomCount',value)}
                title='تعداد سرویس بهداشتی'
                subtitle='چند تا سرویس بهداشتی داره خونتون؟'
                value={bathroomCount} />
                <hr />
            </div>
        )
    }


    if (step===STEPS.IMAGES){
        bodyContent=(
            <div className='flex flex-col gap-8'>
                <Heading
                title='عکس های منزل'
                subtitle='چند تا عکس از خونتون ثبت کنید'
                center
                />

                <ImageUpload onChange={(value)=>console.log(value)} value=''/>
            </div>
        )
    }


    if (step===STEPS.DESCRIPTION){
        bodyContent=(
            <div className='flex flex-col gap-8'>
                <Heading
                title='توضیحات'
                subtitle='در مورد خونتون یه مقدار توضیح بدین'
                center
                />
                {/* <Inpute 
                    id='title'
                    label='یه عنوان خوب برای خونتون بنویسین'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                /> */}
            </div>
        )
    }


    if (step===STEPS.PRICE){
        bodyContent=(
            <div className='flex flex-col gap-8'>
                <Heading
                title='قیمت'
                subtitle='هزینه ی رزرو خونتون تو روزهای مختلف هفته چقده'
                center
                />
                <Inpute
                onChange={(value)=>setCustomValue('price',value)}
                
                id='price'
                label='قیمت'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                formatPrice
                type='number'
                />
            </div>


        )
    }

    

  return (
    <Modals
    title='ثبت منزل'
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step===STEPS.CATEGORY ? undefined : onBack}
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    />
  )
}

export default RentModal