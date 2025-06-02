"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import UnauthNav from "@/components/ui/unauthNav"

export default function TermsPage() {
  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 animate-fadeIn">
      {/* Top Horizontal Navbar */}
      <UnauthNav highlight="None"/>

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

      {/* Terms & Conditions Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-700">Last Updated: March 25, 2024</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-12 border border-orange-200">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">Agreement to Terms</h2>
          <p className="text-gray-700 mb-6">
            These Terms and Conditions constitute a legally binding agreement made between you and LetsCook, concerning
            your access to and use of the website. By accessing or using the platform, you agree to be bound by these
            Terms. If you disagree with any part of the terms, you may not access the website.
          </p>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">Intellectual Property Rights</h2>
          <p className="text-gray-700 mb-6">
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases,
            functionality, software, website designs, audio, video, text, photographs, and graphics on the Site
            (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks")
            are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and
            various other intellectual property rights.
          </p>
          <p className="text-gray-700 mb-6">
            The Content and Marks are provided on the Site "AS IS" for your information and personal use only. Except as
            expressly provided in these Terms, no part of the Site and no Content or Marks may be copied, reproduced,
            aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted,
            distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our
            express prior written permission.
          </p>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">User Representations</h2>
          <p className="text-gray-700 mb-4">By using the Site, you represent and warrant that:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>All registration information you submit will be true, accurate, current, and complete</li>
            <li>
              You will maintain the accuracy of such information and promptly update such registration information as
              necessary
            </li>
            <li>You have the legal capacity and you agree to comply with these Terms</li>
            <li>You are not a minor in the jurisdiction in which you reside</li>
            <li>You will not access the Site through automated or non-human means</li>
            <li>You will not use the Site for any illegal or unauthorized purpose</li>
            <li>Your use of the Site will not violate any applicable law or regulation</li>
          </ul>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">User Registration</h2>
          <p className="text-gray-700 mb-6">
            You may be required to register with the Site. You agree to keep your password confidential and will be
            responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a
            username you select if we determine, in our sole discretion, that such username is inappropriate, obscene,
            or otherwise objectionable.
          </p>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">Prohibited Activities</h2>
          <p className="text-gray-700 mb-4">
            You may not access or use the Site for any purpose other than that for which we make the Site available. The
            Site may not be used in connection with any commercial endeavors except those that are specifically endorsed
            or approved by us.
          </p>
          <p className="text-gray-700 mb-6">As a user of the Site, you agree not to:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              Systematically retrieve data or other content from the Site to create or compile, directly or indirectly,
              a collection, compilation, database, or directory without written permission from us
            </li>
            <li>
              Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by
              electronic or other means for the purpose of sending unsolicited email, or creating user accounts by
              automated means or under false pretenses
            </li>
            <li>Use the Site to advertise or offer to sell goods and services</li>
            <li>Circumvent, disable, or otherwise interfere with security-related features of the Site</li>
            <li>Engage in unauthorized framing of or linking to the Site</li>
            <li>
              Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account
              information such as user passwords
            </li>
            <li>Make improper use of our support services or submit false reports of abuse or misconduct</li>
          </ul>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">User Generated Contributions</h2>
          <p className="text-gray-700 mb-6">
            The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and
            other functionality, and may provide you with the opportunity to create, submit, post, display, transmit,
            perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not
            limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal
            information or other material (collectively, "Contributions").
          </p>
          <p className="text-gray-700 mb-6">
            Any Contribution you post to the site will be considered non-confidential and non-proprietary. By posting
            any Contribution on the Site, you grant us the right to share, copy, distribute, transmit, publicly display,
            publicly perform, reproduce, edit, modify, translate and reformat your Contribution.
          </p>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">Submissions</h2>
          <p className="text-gray-700 mb-6">
            You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information
            regarding the Site ("Submissions") provided by you to us are non-confidential and shall become our sole
            property. We shall own exclusive rights, including all intellectual property rights, and shall be entitled
            to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or
            otherwise, without acknowledgment or compensation to you.
          </p>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">Site Management</h2>
          <p className="text-gray-700 mb-6">
            We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms; (2)
            take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms,
            including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion
            and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent
            technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and
            without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content
            that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Site in
            a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.
          </p>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">Term and Termination</h2>
          <p className="text-gray-700 mb-6">
            These Terms shall remain in full force and effect while you use the Site. We may terminate your access to
            the Site, without cause or notice, which may result in the forfeiture and destruction of all information
            associated with your account. All provisions of these Terms which by their nature should survive termination
            shall survive termination, including, without limitation, ownership provisions, warranty disclaimers,
            indemnity, and limitations of liability.
          </p>

          <h2 className="text-2xl font-bold text-orange-800 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <p className="text-orange-600 font-semibold mt-2">terms@letscook.example.com</p>
        </div>
      </div>
    </div>
  )
}