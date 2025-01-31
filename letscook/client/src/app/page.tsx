"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import "../styles/globals.css"
import styles from "../styles/button.module.css"

export default function Landing() {
    return (
        <motion.div className="min-w-screen min-h-screen min-w-screen bg-white pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
        
            <Button className={styles.main} variant="outline">Button</Button>

        </motion.div>
    )
}