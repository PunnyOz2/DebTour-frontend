"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { Loader2 } from "lucide-react";

import { useSession } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AgencyRevenue = () => {
  const { data: session } = useSession();

  async function getAgencyRevenue() {
    const token = session?.user?.serverToken;
    const username = session?.user?.id;
    const backendUrl = process.env.BACKEND_URL;

    const res = await axios.get(
      `${backendUrl}/api/v1/agencies/getRevenue/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data.revenue;
  }

  const {
    data: agencyRevenue,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAgencyRevenue(),
    queryKey: ["agencyRevenue"],
  });

  if (isLoading) {
    return (
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Loader2 className="mx-auto h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-red-500">
        Error: {error.message}
      </p>
    );
  }

  return (
    <main className="relative min-h-[calc(100vh-60px)] text-center">
      <div className="pt-20">
        <p className="text-sm font-bold uppercase sm:text-lg">
          current revenue
        </p>
        <div className="absolute left-[50%] my-2 h-[3px] w-20 translate-x-[-50%] bg-violet-500" />

        <div className="mt-8 text-5xl font-extrabold md:text-6xl">
          <CountUp end={agencyRevenue} decimals={2} /> ฿
        </div>
      </div>

      <Image
        src={"/get-revenue.svg"}
        alt="get your revenue via email"
        width={500}
        height={500}
        priority={true}
        className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-4"
      />

      <div className="absolute bottom-20 left-[50%] translate-x-[-50%]">
        <p className="text-sm text-gray-500">
          Please contact the administrator to get your revenue via
        </p>
        <p className="mt-4 text-base font-extrabold sm:text-lg md:text-2xl">
          contact@debtourofficial.com
        </p>

        <div className="absolute left-[50%] my-2 h-[3px] w-32 translate-x-[-50%] bg-violet-500" />
      </div>
    </main>
  );
};

export default AgencyRevenue;
