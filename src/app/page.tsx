"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import logo from "@/assets/logo.png";
import ResPreview1 from "@/assets/ResPreview1.png";
import ResPreview2 from "@/assets/ResPreview2.png";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center overflow-hidden bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 py-20 text-center md:flex-row md:text-start lg:gap-12">
        {/* LEFT SIDE TEXT + LOGO */}
        <div className="max-w-prose space-y-4">
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={150}
            className="mx-auto md:ms-0"
          />

          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Make a{" "}
            <span className="inline-block bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text text-transparent">
              Standout Resume
            </span>{" "}
            in just a few clicks
          </h1>

          <div className="text-lg text-gray-500">
            Powerful AI generation, clean templates, and instant downloads —{" "}
            <br />
            <span className="text-2xl font-bold text-gray-900">
              <TypeAnimation
                sequence={[
                  "Optimized for Hiring Success",
                  2000,
                  "Built for Job Seekers",
                  2000,
                  "Loved by Recruiters",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </span>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Link href="/resumes">Start Creating</Link>
          </Button>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative hidden md:block">
          <div className="absolute -inset-10 rounded-2xl bg-orange-400 opacity-30 blur-3xl"></div>
          <Image
            src={ResPreview1}
            alt="Resume preview"
            width={600}
            className="relative rounded-xl shadow-lg lg:rotate-[2deg]"
          />
        </div>
      </section>
      {/* Features Section */}
      <section className="w-full bg-white py-20 text-center">
        <h2 className="mb-10 text-4xl font-bold">Why Choose Our Builder?</h2>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          {[
            {
              title: "AI-Powered Suggestions",
              desc: "Get smart, data-driven suggestions to highlight your strengths.",
            },
            {
              title: "One-Click Formatting",
              desc: "Focus on your content, we’ll make it look beautiful automatically.",
            },
            {
              title: "Instant PDF Download",
              desc: "Export your resume instantly in a polished, ATS-friendly format.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-md"
            >
              <h3 className="mb-3 text-2xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Templates Section */}
      <section className="w-full bg-gray-50 px-6 py-16 text-center">
        <h2 className="mb-10 text-4xl font-extrabold">Templates</h2>

        <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:justify-center">
          {/* Modern Template */}
          <div className="flex w-full max-w-xs flex-col items-center md:w-1/3">
            <Image
              src={ResPreview1}
              alt="Modern Resume"
              width={350}
              height={500}
              className="mb-4 rounded-xl shadow-2xl"
              priority
            />
            <span className="text-lg font-bold">Modern</span>
          </div>

          {/* Professional Template */}
          <div className="flex w-full max-w-xs flex-col items-center md:w-1/3">
            <Image
              src={ResPreview2}
              alt="Professional Resume"
              width={350}
              height={500}
              className="mb-4 rounded-xl shadow-2xl"
              priority
            />
            <span className="text-lg font-bold">Professional</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-white py-20 text-center">
        <h2 className="mb-10 text-4xl font-bold">How It Works</h2>
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Enter Your Details",
              desc: "Fill in your experience, education, and skills in our guided form.",
            },
            {
              step: "2",
              title: "Let AI Improve It",
              desc: "Get real-time AI suggestions to make your resume more impactful.",
            },
            {
              step: "3",
              title: "Download Instantly",
              desc: "Preview and download your resume in PDF with one click.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
            >
              <div className="mb-3 text-5xl font-bold text-orange-600">
                {item.step}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-gray-50 py-20 text-center">
        <h2 className="mb-8 text-4xl font-bold">Frequently Asked Questions</h2>
        <div className="mx-auto max-w-3xl space-y-6 px-6 text-left">
          {[
            {
              q: "Is the resume builder free?",
              a: "Yes, creating and editing resumes is completely free. You can upgrade later for more templates and features.",
            },
            {
              q: "Can I download my resume as a PDF?",
              a: "Absolutely! You can export your resume instantly as a professional-looking PDF.",
            },
            {
              q: "Do I need design skills to use it?",
              a: "No design experience needed — our templates and AI take care of that for you.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <h3 className="mb-2 text-lg font-semibold">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-black-300 w-full bg-orange-200 py-10 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <Image
            src={logo}
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto mb-4 opacity-80"
          />
          <p className="mb-4 text-sm">
            © {new Date().getFullYear()} ResAI. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/tos" className="transition hover:text-white">
              Terms of Use
            </Link>
            <Link href="#" className="transition hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
