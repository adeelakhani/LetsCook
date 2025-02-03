"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import Image from "next/image"
import "../styles/globals.css"
import styles from "../styles/button.module.css"

// Acertinity UI
// ShadCN UI

export default function Landing() {
    console.log(styles)
    return (
        <motion.div className="min-w-screen min-h-screen min-w-screen bg-white pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <Button>Button</Button>


            <div className="flex justify-around">
            <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                    <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                    Make things float in air
                    </CardItem>
                    <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                    Hover over this card to unleash the power of CSS perspective
                    </CardItem>
                    <div className="flex justify-between items-center mt-20">
                    <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                        Sign up
                    </CardItem>
                    </div>
                </CardBody>
            </CardContainer>
            <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                    <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                    Make things float in air
                    </CardItem>
                    <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                    Hover over this card to unleash the power of CSS perspective
                    </CardItem>
                    <div className="flex justify-between items-center mt-20">
                    <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                        Sign up
                    </CardItem>
                    </div>
                </CardBody>
            </CardContainer>
            </div>


        </motion.div>
    )
}