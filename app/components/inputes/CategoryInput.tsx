import { IconType, icons } from "react-icons";


interface CategoryInputeProps{
    icon:IconType,
    label:string
    selected?:boolean
    onClick:(value:string)=>void
    register?:null
}   


const CategoryInput = ({
    icon:Icon,label,selected,onClick
}:CategoryInputeProps) => {
  return (
    <div
        onClick={()=>onClick(label)}
        className={`
        rounded-xl
        border-2
        p-1
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor
        ${selected ? 'border-black': 'border-neutral-200'}
        `}
    >
        <Icon size={20}/>
        {label}
    </div>
  )
}

export default CategoryInput

