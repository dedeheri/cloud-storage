"use client";

import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

import banner from "@/assets/banner.png";

import { motion } from "framer-motion";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/moving-border";
import Image from "next/image";
import { IconCloud } from "@tabler/icons-react";

export default async function page() {
  const router = useRouter();

  return (
    <div className="h-screen  w-full  md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="max-w-7xl mx-auto pt-10">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="flex justify-between w-full mb-[8rem]">
            <div className="flex space-x-3 items-center">
              <IconCloud className="w-12 h-12" />
              <h1 className="text-3xl">Cloud</h1>
            </div>

            <div className="bg-white text-black flex items-center w-60 h-11 rounded-2xl pr-1 pl-4 space-x-5">
              <Link href={"/drive"} className="text-xl">
                Drive
              </Link>
              <div className="bg-black h-10 flex items-center rounded-2xl w-full justify-center text-white">
                <Link href={"/account/signin"} className="text-xl">
                  Sign in
                </Link>
              </div>
            </div>
          </div>

          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center mb-20">
            Easy and secure, access to your content.
          </div>

          <Button
            borderRadius="0.75rem"
            className="bg-white dark:bg-slate-900  text-black dark:text-white border-neutral-200 dark:border-slate-800 "
          >
            <Image alt="banner" src={banner} className="w-full h-full  " />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
