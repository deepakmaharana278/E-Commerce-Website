import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
      <Layout>
      <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About UniCart</h1>

      {/* Intro Paragraph */}
      <p className="text-gray-600 leading-relaxed mb-6">
        Welcome to <span className="font-semibold">UniCart</span> — your one‑stop
        shop for all things fashion, electronics, home essentials, and more.
        Our mission is to make online shopping simple, affordable, and
        accessible for everyone.
      </p>

      {/* Mission Section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        At UniCart, we believe in delivering not just products, but also
        experiences. We strive to provide top quality items, secure payment
        options, and quick delivery, so you can shop with confidence.
      </p>

      {/* Values List */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        What Makes Us Different
      </h2>
      <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-6">
        <li>Wide range of curated products from trusted brands</li>
        <li>Competitive prices and frequent discounts</li>
        <li>Fast & reliable delivery service</li>
        <li>Secure payments & easy returns</li>
        <li>Dedicated customer support team</li>
      </ul>

      {/* Closing */}
      <p className="text-gray-600 leading-relaxed">
        Whether you’re shopping from the comfort of your home or browsing on
        the go, UniCart is here to make sure your shopping experience is smooth,
        safe, and satisfying.
      </p>
    </div>
      </Layout>
  )
}

export default About