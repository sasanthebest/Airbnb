'use client'
import Container from '../Container'
import {TbBeach,TbMountain,TbPool} from "react-icons/tb"
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill} from "react-icons/gi"
import {IoDiamond} from 'react-icons/io5'
import {MdOutlineVilla} from "react-icons/md"
import {FaSkiing} from 'react-icons/fa'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { BsSnow } from 'react-icons/bs'


export const categories=[{
  label:"Beach",
  icon:  TbBeach,
  description:"این خونه نزدیک ساحله"
  },
  {
    label:"Windmills",
    icon:  GiWindmill,
    description:"این خونه نزدیک ساحله"
  },
  {
    label:"Modern",
    icon:  MdOutlineVilla,
    description:"این خونه نزدیک ساحله"
  },
  {
    label:"CountrySide",
    icon:  TbMountain,
    description:"این خونه نزدیک ساحله"
  },
  {
    label:"Pool",
    icon:  TbPool,
    description:"این خونه نزدیک ساحله"
  },
  {
    label:"Islands",
    icon:  GiIsland,
    description:"این خونه نزدیک ساحله"
  },
  {
    label:"Lake",
    icon:  GiBoatFishing ,
    description:"این خونه نزدیک ساحله"
  },
  {
    label:"Skiing",
    icon:  FaSkiing ,
    description:"این خونه نزدیک ساحله"
  },
  {
    label:"Castles",
    icon:  GiCastle ,
    description:"این خونه نزدیک ساحله"
  },
  {
    label:"Camping",
    icon:  GiForestCamp ,
    description:"این خونه نزدیک ساحله"
  },
  {
    label:"Arctic",
    icon:  BsSnow ,
    description:"این خونه نزدیک ساحله"
  },
  {
    label:"Cave",
    icon:  GiCaveEntrance  ,
    description:"این خونه نزدیک ساحله"
  },
  {
    label:"Desert",
    icon:  GiCactus  ,
    description:"این خونه نزدیک ساحله"
  },
  {
    label:"Barn",
    icon:  GiBarn  ,
    description:"این خونه نزدیک ساحله"
  },
  {
    label:"Lux",
    icon:  IoDiamond  ,
    description:"این خونه نزدیک ساحله"
  }
]


const Category = () => {
  const params= useSearchParams()
  const category =params?.get('category')
  const pathname=usePathname()
//  const isMainPage= pathname==="/";
//  if (!isMainPage) return null
  return (<> 
   { pathname==="/" && (<Container>
        <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
          {categories.map((item)=>(
            <CategoryBox key={item.label} icon={item.icon} label={item.label} selected={category=== item.label}></CategoryBox>
          ))}
        </div>
    </Container>)}</>
  
  )
}

export default Category

