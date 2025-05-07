import React from 'react'

import type { Footer } from '@/payload-types'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const { logo, description, contactInformation, links, navItems, servicesItems } = footerData

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
            {/* Logo, mô tả, mail, số điện thoại, CTA */}
            <div className="flex flex-col gap-6">
              {/* Logo, mô tả */}
              <div>
                {logo ? (
                  <Media
                    aria-hidden="true"
                    alt="Kurosawa Logo"
                    resource={logo}
                    className="w-[100px] aspect-square"
                  />
                ) : (
                  <div className="w-[100px] h-[100px] text-2xl bg-muted text-muted-foreground flex items-center justify-center">
                    LOGO
                  </div>
                )}

                <p className="mt-2 text-muted-foreground">
                  {description
                    ? description
                    : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit quisque rutrum pellentesque.'}
                </p>
              </div>

              {/* Email */}
              {contactInformation?.email && (
                <p className="text-lg font-semibold">{contactInformation.email}</p>
              )}

              {/* Phone */}
              {contactInformation?.phone && (
                <p className="text-lg font-semibold">{contactInformation.phone}</p>
              )}

              {/* CTA */}
              <div className="space-x-4">
                {(links || []).map(({ link }, i) => {
                  let buttonStyle =
                    'bg-primary text-primary-foreground font-semibold hover:bg-primary/80 px-6 py-3 rounded'
                  if (link.appearance == 'outline')
                    buttonStyle =
                      'bg-secondary-foreground text-secondary font-semibold hover:bg-secondary-foreground/80 px-6 py-3 rounded'
                  return <CMSLink key={i} size="lg" {...link} className={buttonStyle} />
                })}
              </div>
            </div>
            {/* Navigation links */}
            <div className="flex flex-col justify-between col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                {/* Common Navigation */}
                <div>
                  <h3 className="font-bold">Navigation</h3>
                  <ul className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {navItems &&
                      navItems.map(({ link }, i) => (
                        <li key={i}>
                          <CMSLink {...link} className="text-muted-foreground hover:text-primary" />
                        </li>
                      ))}
                  </ul>
                </div>
                {/* Services navigation */}
                <div>
                  <h3 className="font-bold">Services</h3>
                  <ul className="mt-2 grid lg:grid-cols-2 grid-cols-1 gap-2">
                    {servicesItems &&
                      servicesItems.map(({ link }, i) => (
                        <li key={i}>
                          <CMSLink {...link} className="text-muted-foreground hover:text-primary" />
                        </li>
                      ))}
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
                    className="border border-border rounded-l px-4 py-2 w-full text-muted-foreground"
                  />
                  <button className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-r">
                    GO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-8 text-center text-muted-foreground border-t border-t-white/10">
          <p>Kurosawa Consulting Vietnam © {new Date().getFullYear()}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
