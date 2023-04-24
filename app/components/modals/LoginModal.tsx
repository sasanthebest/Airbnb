"use client";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import {signIn} from 'next-auth/react'
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modals from "./Modals";
import Heading from "../Heading";
import Inpute from "../inputes/Inpute";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/Fc";
import { BsFacebook } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/hooks/useLoginModal";
import { redirect } from "next/dist/server/api-utils";
import {useRouter} from 'next/navigation'
import getCurrentUser from "@/app/actions/getCurrentUser";
import RegisterModal from "./RegisterModal";


const LoginModal = () => {
  const router=useRouter()
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials',{...data,redirect:false})
    .then((res)=>{
        if (res?.ok){
            setIsLoading(false)
            toast.success('.ورود شما با موفقیت انجام شد')
            router.refresh()
            loginModal.onClose()
            
        }
        if (res?.error){
          toast.error('.مشکلی بوجود اومده')
        }
    })




    
  };
  const toggle=useCallback(
    () => {
      loginModal.onClose()
      registerModal.onOpen()
    },
    [loginModal,registerModal],
  )
  

  const bodyContent = (
    <div className="flex flex-col gap-">
      <Heading
        title="welcom back"
        subtitle=".به حساب کاربری خود وارد شوید"
        center
      />
      <Inpute
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Inpute
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div
      className="
        flex flex-col gap-4 mt-3
     "
    >
      <hr />
      {/* <Button
        outline
        label="ثبت نام با گوگل"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="ثبت نام با گیت هاب"
        icon={AiFillGithub}
        onClick={() => {}}
      /> */}
      <div
        className="
        text-neutral-500
        text-center
        mt-4
        font-light
      "
      >
        <div className="justify-center flex flex-row item-center gap-2">
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            ثبت نام کنید
          </div>
          <div>حساب کاربری ندارید؟</div>
        </div>
      </div>
    </div>
  );

  return (
    <Modals
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="ورود"
      actionLabel="ادامه"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
