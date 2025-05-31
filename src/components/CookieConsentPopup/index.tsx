'use client'
import React, { useEffect, useState } from 'react'

const COOKIE_KEY = 'cookie_consent'

const CookieConsentPopup = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) setVisible(true)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-auto md:bottom-0 left-0 top-0 md:top-auto w-full z-50 bg-white text-dark shadow-[0_-4px_24px_0_rgba(0,0,0,0.12)] p-6 flex flex-col md:flex-row items-center gap-4">
      <span>
        We use our own cookies as well as third-party cookies on our websites to enhance your
        experience, analyze our traffic, and for security and marketing. Select{' '}
        <b>&quot;Accept all&quot;</b> to allow them to be used.
      </span>
      <button
        onClick={acceptCookies}
        className="bg-primary w-full md:w-auto text-white px-4 py-2 text-nowrap rounded-lg hover:bg-primary/80"
      >
        Block all traffic
      </button>
      <button
        onClick={acceptCookies}
        className="bg-primary w-full md:w-auto text-white px-4 py-2 text-nowrap rounded-lg hover:bg-primary/80"
      >
        Accept all
      </button>
    </div>
  )
}

export default CookieConsentPopup
