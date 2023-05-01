'use client'

import { Range } from "react-date-range";
import Calendar from "../inputes/Calendar";
import Button from "../Button";
import { safeReservation } from "@/app/types";

interface ListingReservationProps{
    reservations:safeReservation[]
    price:number;
    totalPrice:number;
    disabled?:boolean;
    dateRange:Range ;
    disabledDates:Date[];
    onSubmit:()=>void;
    onChangeDate:(value:Range)=>void;
}

const ListingReservation = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabled,
    disabledDates
}:ListingReservationProps) => {
  return (
    <div
    className="
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden
    "
    >
        <div className="flex flex-row items-center gap-1 p-4">

            <div className="text-2xl font-semibold">{price}</div>
            <div className="font-light text-neutral-600">هر شب</div>
        </div>
        <hr />
        <Calendar
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value)=>onChangeDate(value.selection)}
        />
        <hr />
        <div className="p-4">
            <Button
                disabled={disabled}
                label="رزرو"
                onClick={onSubmit}
            />
        </div>
        <div className="
            p-4
            flex
            flex-row
            items-center
            justify-between
            font-semibold
            text-lg
        ">
            <div>{totalPrice}</div>
            <div >مجموع</div>
        </div>
    </div>
  )
}

export default ListingReservation