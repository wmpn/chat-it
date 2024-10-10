import DashNav from "@/components/dashboard/DashNav";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import CreatChat from "@/components/groupChat/CreatChat";

const dashboard = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div>
      <DashNav
        name={session?.user?.name!}
        image={session?.user?.image ?? undefined}
      />
      <div className="container">
        <div className="flex justify-end mt-10">
          <CreatChat user={session?.user!} />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
