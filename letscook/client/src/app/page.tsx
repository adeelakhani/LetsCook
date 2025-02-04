"use client"
import React from "react"
// import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card"
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect"
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards"
import { Button } from "../components/ui/moving-border"
import Image from "next/image"
import "../styles/globals.css"
import buttonStyles from "../styles/button.module.css"
import titleStyles from "../styles/title.module.css"

// Acertinity UI
// ShadCN UI

export default function Landing() {
    const title = [
        {
          text: "The",
        },
        {
          text: "journey",
        },
        {
          text: "to",
        },
        {
          text: "cooking",
        },
        {
          text: "mastery",
        },
        {
          text: "begins...",
          className: "text-[#0a496a] dark:text-[#0a496a]",
        }
      ]   
      
      const testimonials = [
        {
          quote:
            "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
          name: "Charles Dickens",
          title: "A Tale of Two Cities",
        },
        {
          quote:
            "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
          name: "William Shakespeare",
          title: "Hamlet",
        },
        {
          quote: "All that we see or seem is but a dream within a dream.",
          name: "Edgar Allan Poe",
          title: "A Dream Within a Dream",
        },
        {
          quote:
            "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
          name: "Jane Austen",
          title: "Pride and Prejudice",
        },
        {
          quote:
            "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
          name: "Herman Melville",
          title: "Moby-Dick",
        },
      ];

    return (
        <div className="min-w-screen min-h-screen min-w-screen pt-8">   

            <div className="flex flex-col justify-center items-center">
                <TypewriterEffectSmooth words={title} className="mb-[-0.5em]"/>
                <motion.div className="w-fit ease-in-out text-base sm:text-xl md:text-5xl xl:text-7xl font-bold bg-gradient-to-r from-[#0a496a] to-[#00b4d8] bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 3.5 }}
                >
                    <motion.div
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.2 }
                        }}                        
                    >
                        LetsCook!
                    </motion.div>
                    <Button
                        borderRadius="1.75rem"
                        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                    >
                        Begin!
                    </Button>
                </motion.div>
                <Button
                        borderRadius="1.75rem"
                        className="bg-black dark:bg-slate-900 text-white dark:text-white border-neutral-200 dark:border-slate-800"
                    >
                        Begin!
                </Button>

            </div>

            <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                />
            </div>



        </div>
    )
}