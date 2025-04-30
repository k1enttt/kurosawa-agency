import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export async function Footer() {
  // const footerData: Footer = await getCachedGlobal('footer', 1)()

  return (
    <footer className="bg-secondary text-secondary-foreground p-8">
      {/* Logo, mô tả, mail, số điện thoại, CTA, Navigation */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          {/* Logo */}
          <img
            aria-hidden="true"
            alt="Kurosawa Logo"
            src="https://openui.fly.dev/openui/24x24.svg?text=🌿"
          />

          {/* Mô tả */}
          <p className="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit quisque rutrum pellentesque.
          </p>

          {/* Email */}
          <p className="mt-2">kurosawa@domain.com</p>

          {/* Phone */}
          <p className="mt-2">+84-90-1392-232</p>

          {/* CTA */}
          <div className="mt-4">
            <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded">
              Our services
            </button>
            <button className="bg-accent text-accent-foreground hover:bg-accent/80 px-4 py-2 rounded">
              Get a Quote
            </button>
          </div>
        </div>
        {/* Common Navigation */}
        <div>
          <h3 className="font-bold">Navigation</h3>
          <ul className="mt-2">
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                News
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Recruitment
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        {/* Services navigation */}
        <div>
          <h3 className="font-bold">Services</h3>
          <ul className="mt-2">
            <li className="text-muted-foreground">Establishment support service</li>
            <li className="text-muted-foreground">Translation service</li>
            <li className="text-muted-foreground">Tax consulting service</li>
            <li className="text-muted-foreground">Real estate consulting service</li>
          </ul>
        </div>
      </div>
      {/* Newsletter */}
      <div className="mt-8">
        <h3 className="font-bold">Subscribe to Newsletter:</h3>
        <div className="flex mt-2">
          <input
            type="email"
            placeholder="Email Address"
            className="border border-border rounded-l px-4 py-2 w-full"
          />
          <button className="bg-accent text-accent-foreground hover:bg-accent/80 px-4 py-2 rounded-r">
            GO
          </button>
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-8 text-center text-muted-foreground">
        <p>Kurosawa Consulting Vietnam © 2025. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
