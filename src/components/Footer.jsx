'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Separator } from '@heroui/react';
import { 
  MapPinCheck, 
  PhoneCall, 
  MailIcon, 
} from 'lucide-react';

import { BsFacebook,BsTwitter, BsInstagram, BsLinkedin } from 'react-icons/bs';


export default function Footer() {
  // Current year for the copyright section
  const currentYear = new Date().getFullYear();

  return (
    // Dark background to match the Navbar's blackish theme
    <footer className="bg-black text-gray-200  border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Section: Grid for Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. Brand Information */}
          <div className="flex flex-col gap-4">
            {/* Reused Logo from Navbar */}
            <div className="flex gap-2 items-center text-white">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 font-bold text-3xl text-white">
                G
              </div>
              <div className="flex flex-col gap-0">
                <p className="font-bold text-2xl tracking-tight m-0 leading-none">
                  bKROY
                </p>
                <p className="text-sm font-normal text-gray-400 m-0 leading-none">
                  Solutions
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              Empowering businesses with cutting-edge technology and innovative digital solutions for a brighter, more connected future.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-lg tracking-wide">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-blue-500 transition-colors">Products</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-blue-500 transition-colors">Categories</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-500 transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-500 transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Information */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-lg tracking-wide">Contact Us</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex gap-3 items-start">
                <MapPinCheck size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>123 Innovation Drive,<br />Tech City, TC 90210</span>
              </li>
              <li className="flex gap-3 items-center">
                <PhoneCall size={18} className="text-blue-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex gap-3 items-center">
                <MailIcon size={18} className="text-blue-500 shrink-0" />
                <span>support@bkroy.com</span>
              </li>
</ul>
          </div>

          {/* 4. Social Media Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-lg tracking-wide">Follow Us</h3>
            <p className="text-gray-400 text-sm mb-2">
              Stay connected and get the latest updates.
            </p>
            <div className="flex gap-2">
              <Button isIconOnly variant="flat" color="primary" className="bg-white/5 text-gray-200 hover:text-white hover:bg-blue-600 transition-all" aria-label="Facebook">
                <BsFacebook size={20} />
              </Button>
              <Button isIconOnly variant="flat" color="primary" className="bg-white/5 text-gray-200 hover:text-white hover:bg-blue-400 transition-all" aria-label="Twitter">
                <BsTwitter size={20} />
              </Button>
              <Button isIconOnly variant="flat" color="primary" className="bg-white/5 text-gray-200 hover:text-white hover:bg-pink-600 transition-all" aria-label="Instagram">
                <BsInstagram size={20} />
              </Button>
              <Button isIconOnly variant="flat" color="primary" className="bg-white/5 text-gray-200 hover:text-white hover:bg-blue-700 transition-all" aria-label="LinkedIn">
                <BsLinkedin size={20} />
              </Button>
            </div>
          </div>
          
        </div>

        {/* Hero UI Divider for visual separation */}
        <Separator className="bg-white/10 my-8" />

        {/* 5. Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {currentYear} bKROY Solutions. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}