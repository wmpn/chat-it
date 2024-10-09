"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";

const LoginModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Getting Start</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Chat It</DialogTitle>
          <DialogDescription>Secure and Effortless chatting</DialogDescription>
        </DialogHeader>
        <Button>
          <Image
            src="./images/google.png"
            className="mr-4"
            height={25}
            width={25}
            alt="google_logo"
          />
          Continue with google
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
