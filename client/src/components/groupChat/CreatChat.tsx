"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createChatSchema,
  createChatSchemaType,
} from "@/validations/groupChatValidation";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { CHAT_GROUP_URL } from "@/lib/apiEndPoints";

const CreatChat = ({ user }: { user: CustomUser }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });

  const onSubmit = async (payload: createChatSchemaType) => {
    console.log("The chat payload is: ", payload, user);
    try {
      setLoading(true);
      const { data } = await axios.post(
        CHAT_GROUP_URL,
        {
          ...payload,
          user_id: user.id,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );

      if (data?.message) {
        setLoading(false);
        setOpen(false);
        toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong, Please try again");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Creat Group</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create a new chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <input
              type="text"
              className="w-full"
              placeholder="Enter chat title"
              {...register("title")}
            />
            <span className="text-red-500">{errors?.title?.message}</span>
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="w-full"
              placeholder="Enter chat passcode"
              {...register("passcode")}
            />
            <span className="text-red-500">{errors?.passcode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatChat;
