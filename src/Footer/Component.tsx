import React from 'react'

import type { Footer } from '@/payload-types'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import CustomForm from '@/blocks/CustomForm'

export async function Footer() {
  const footerData: {
    form: FormType
  } & Footer = (await getCachedGlobal('footer', 1)()) as {
    form: FormType
  } & Footer

  const {
    logo,
    description,
    contactInformation,
    links,
    navItems,
    servicesItems,
    form: formFromProps,
  } = footerData

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
                  <Link href={'/'}>
                    <Media
                      aria-hidden="true"
                      alt="Kurosawa Logo"
                      resource={logo}
                      className="w-[100px] aspect-square"
                    />
                  </Link>
                ) : (
                  <div className="w-[100px] h-[100px] text-2xl bg-muted text-muted-foreground flex items-center justify-center">
                    LOGO
                  </div>
                )}

                {description && <p className="mt-2 text-muted-foreground">{description}</p>}
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
                  <h3 className="font-bold text-lg">Navigation</h3>
                  <ul className="mt-4 grid grid-cols-2 gap-4">
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
                  <h3 className="font-bold text-lg">Services</h3>
                  <ul className="mt-4 grid grid-cols-2 gap-4">
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
              <div className="mt-8 w-full flex md:items-center items-start md:flex-row flex-col gap-x-4 gap-y-2">
                <h3 className="font-bold text-lg">Subscribe to Newsletter:</h3>
                <CustomForm form={formFromProps} />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-8 text-center text-muted-foreground border-t border-t-muted-foreground/20">
          <p>Kurosawa Consulting Vietnam © {new Date().getFullYear()}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
