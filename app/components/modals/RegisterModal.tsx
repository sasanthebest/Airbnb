"use client";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
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
import LoginModal from "./LoginModal";
import useLoginModal from "@/hooks/useLoginModal";
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const res = axios
      .post("/api/register", data)
      .then((res) => {
        registerModal.onClose();
        toast.success("!!ایولا");
      })
      .catch((err) => toast.error("!! کص نگو "))
      .finally(() => setIsLoading(false));
  };

  const toggle=useCallback(
    () => {
        registerModal.onClose()
        loginModal.onOpen()
    },
    [registerModal,registerModal],
  )
  

  const bodyContent = (
    <div className="flex flex-col gap-">
      <Heading
        title="welcom to Airbnb"
        subtitle=".حساب کاربری ایجاد کنید"
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
        id="name"
        label="Name"
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
            ورود
          </div>
          <div>قبلا ثبت نام کرده اید؟</div>
        </div>
      </div>
    </div>
  );

  return (
    <Modals
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="ثبت نام"
      actionLabel="ادامه"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
