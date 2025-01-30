"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import "./globals.css";

export default function Login() {
  return (

    <motion.div className="pl-8 min-h-screen min-w-screen bg-[#FAF9F6] pt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
        {/*b0d8e7*/}
      <div className="flex items-center">
        <Image
          src="/LetsCook_processed.png"
          alt="LetsCook Logo"
          className="rounded-full flex-left ml-4"
          width={90}
          height={90}
        />
        <h1 className="font-bold ml-8 text-[5em] bg-gradient-to-r from-red-500 via-purple-500 to-purple-700 bg-clip-text text-transparent">
          LetsCook
        </h1>
      </div>
      <hr className="border-t-1 border-black my-4 w-[98%] text-center" />

      
      <div className="flex justify-between items-center">
        <div className="ml-[6%] w-[50%]">
          <div className="pl-[8%] mt-20 font-bold">
            <h1 className="text-3xl md:text-5xl tracking-tight text-gray-900 mb-4">
              Learn to cook with{" "}
              <span className="inline-block italic bg-gradient-to-r from-red-500 via-purple-500 to-purple-700 bg-clip-text text-transparent ease-in-out duration-300 transition-transform hover:-translate-y-2">
                LetsCook!
              </span>
            </h1>
            <h1 className="text-3xl md:text-5xl tracking-tight text-gray-900 mb-4">
              Challenge yourself with recipes!
            </h1>

            <h1 className="text-3xl md:text-5xl tracking-tight text-gray-900">
              Be #1 on the leaderboards!
            </h1>
          </div>

          <div className="pl-[8%] mt-[2%]">
            <p className="text-4xl md:text-[30px] tracking-tight text-gray-900 mb-1">
              Login or sign up and join the community in a
            </p>
            <p className="text-4xl md:text-[30px] tracking-tight text-gray-900 mb-6">
              fierce and friendly cooking battle!
            </p>
          </div>

          <Button
              variant="outline"
              className="ml-[8%] p-4 pt-6 pb-6 rounded-xl text-2xl text-white bg-[#1B3964] drop-shadow-xl shadow-black hover:bg-[#2D5B9D] ease-in-out transition-transform hover:-translate-y-2"
          >
              Log in
          </Button>
        </div>

        <div className="mt-[5%]">

          <Button
                variant="outline"
                className="w-[400px] h-auto whitespace-normal p-5 ml-[25%] mb-5 mp-20 pt-10 pb-10 rounded-xl shadow-black rounded-br-sm text-2xl text-white bg-[#918f8f] drop-shadow-xl hover:bg-[#918f8f] ease-in-out transition-transform hover:-translate-y-2"
            >
                Man I wish I had a way to show off my amazing cooking skills!
          </Button>
          
          <Button
                variant="outline"
                className="w-[400px] h-auto whitespace-normal ml-[8%] p-5 rounded-xl shadow-black rounded-bl-sm text-2xl text-white bg-[#218aff] drop-shadow-xl hover:bg-[#218aff] ease-in-out transition-transform hover:-translate-y-2"
          >
              Have you heard of LetsCook? A NEW website for cooking challenges!
          </Button>
        </div>
      </div>
    </motion.div>
  );
}