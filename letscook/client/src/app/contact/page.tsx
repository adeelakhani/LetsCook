"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

import UnauthNav from "@/components/ui/unauthNav"
import CTA from "@/components/ui/cta"

export default function ContactPage() {

  const router = useRouter()

  // Delete this when contact page comes back
  router.push('404')

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the form data to your backend
    console.log("Form submitted:", formState)
    // Show success message
    setIsSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 animate-fadeIn">
      {/* Top Horizontal Navbar */}
      <UnauthNav highlight="Contact"/>

      {/* Back to Home Button */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="flex items-center text-orange-600 hover:text-orange-700 hover:bg-orange-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Contact Us Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <Card className="p-6 border border-orange-200 shadow-md bg-white">
              <h2 className="text-2xl font-bold text-orange-800 mb-6">Send Us a Message</h2>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold text-green-600 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We'll get back to you soon!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      rows={5}
                      required
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 transition-all duration-300 hover:-translate-y-1"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Contact Information */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg border border-orange-200 shadow-md">
                <h2 className="text-2xl font-bold text-orange-800 mb-6">Get in Touch</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-orange-500 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Email Us</h3>
                      <p className="text-orange-600">hello@letscook.example.com</p>
                      <p className="text-sm text-gray-600 mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-orange-500 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Call Us</h3>
                      <p className="text-orange-600">(123) 456-7890</p>
                      <p className="text-sm text-gray-600 mt-1">Monday-Friday, 9am-5pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-orange-500 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Visit Us</h3>
                      <p className="text-orange-600">123 Cooking Street</p>
                      <p className="text-gray-600">Foodie District, Culinary City 12345</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white p-6 rounded-lg border border-orange-200 shadow-md">
                <h2 className="text-2xl font-bold text-orange-800 mb-6">Frequently Asked Questions</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">How do I create an account?</h3>
                    <p className="text-gray-600 mt-1">
                      Click on the "Sign in" button at the top of the page and follow the registration process.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">Is LetsCook free to use?</h3>
                    <p className="text-gray-600 mt-1">
                      Yes! LetsCook is completely free for all users. We believe cooking should be accessible to
                      everyone.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">How do I earn points?</h3>
                    <p className="text-gray-600 mt-1">
                      You can earn points by completing cooking challenges, posting your own recipes, and receiving
                      likes on your submissions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white p-6 rounded-lg border border-orange-200 shadow-md">
          <h2 className="text-2xl font-bold text-orange-800 mb-6">Find Us</h2>
          <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden relative animate-shimmer-border">
            <Image
              src="/Map.png"
              alt="Map location"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* CTA Section */}
        <CTA />
      </div>
    </div>
  )
}