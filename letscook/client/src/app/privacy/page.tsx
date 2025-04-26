"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

import UnauthNav from "@/components/ui/unauthNav"

export default function PrivacyPage() {
  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 animate-fadeIn">
      {/* Top Horizontal Navbar */}
      <UnauthNav highlight="None" />


      {/* Back to Home Button */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link href="/">
          <Button variant="ghost" className="flex items-center text-orange-600 hover:text-orange-700 hover:bg-orange-50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-700">
            Last Updated: March 25, 2024
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-12 border border-orange-200">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">Introduction</h2>
          <p className="text-gray-700 mb-6">
            At LetsCook, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect information that you provide directly to us when you:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Register for an account</li>
            <li>Create or modify your profile</li>
            <li>Post recipes or cooking challenges</li>
            <li>Upload photos of your culinary creations</li>
            <li>Participate in contests or promotions</li>
            <li>Send us feedback or contact us</li>
          </ul>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We may use the information we collect about you for various purposes, including to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process and complete transactions</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Communicate with you about products, services, offers, and events</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Personalize and improve your experience</li>
          </ul>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">Sharing of Information</h2>
          <p className="text-gray-700 mb-6">
            We may share the information we collect in various ways, including:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
            <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process</li>
            <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of LetsCook or others</li>
            <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company</li>
            <li>With your consent or at your direction</li>
          </ul>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">Data Security</h2>
          <p className="text-gray-700 mb-6">
            We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet or email transmission is ever fully secure or error-free.
          </p>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">Your Choices</h2>
          <p className="text-gray-700 mb-6">
            You can access and update certain information about you from within your account settings. You can also request that we delete your account and personal information by contacting us.
          </p>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">Changes to this Privacy Policy</h2>
          <p className="text-gray-700 mb-6">
            We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
          </p>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this privacy policy, please contact us at:
          </p>
          <p className="text-orange-600 font-semibold mt-2">
            privacy@letscook.example.com
          </p>
        </div>
      </div>
    </div>
  )
}