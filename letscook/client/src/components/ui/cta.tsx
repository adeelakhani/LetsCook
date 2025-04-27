"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTA() {
    return (
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-md p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Cooking Revolution</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
            Whether you're a beginner or a seasoned chef, there's a place for you in our community. Start your culinary journey today!
            </p>
            <Link href="/login">
            <Button className="bg-white text-orange-600 hover:bg-orange-100 font-bold px-8 py-6 text-lg transition-all duration-300 hover:-translate-y-1">
                Get Started
            </Button>
            </Link>
        </div>
        
    )
}