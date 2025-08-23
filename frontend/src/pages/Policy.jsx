import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
      <Layout>
           <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Privacy Policy
      </h1>

      {/* Intro */}
      <p className="text-gray-600 leading-relaxed mb-6">
        At <span className="font-semibold">UniCart</span>, we value and respect
        your privacy. This Privacy Policy outlines how we collect, use, and
        protect your personal information when you use our website and services.
      </p>

      {/* Section 1 */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        1. Information We Collect
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        We may collect information you provide when creating an account, making
        a purchase, or contacting us. This may include your name, email
        address, shipping/billing address, phone number, and payment
        information. We also gather non‑personal data like browser type, device
        details, and pages you visit.
      </p>

      {/* Section 2 */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4">
        <li>To process orders and deliver products</li>
        <li>To send important updates and order notifications</li>
        <li>To improve website functionality and customer experience</li>
        <li>To prevent fraudulent transactions and ensure security</li>
      </ul>

      {/* Section 3 */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        3. Data Protection
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        We implement industry‑standard security measures to protect your
        personal information. However, no method of transmission over the
        internet is completely secure, so we cannot guarantee 100% security.
      </p>

      {/* Section 4 */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        4. Sharing of Information
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        We do not sell or rent your personal information to third parties. We
        may share data with trusted partners who help us operate our website,
        process payments, and deliver orders — but only for the purposes stated
        above.
      </p>

      {/* Section 5 */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        5. Your Rights
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        You may request access to, correction of, or deletion of your personal
        information at any time. You may also opt out of receiving promotional
        messages from us.
      </p>

      {/* Section 6 */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        6. Updates to This Policy
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        We may update this Privacy Policy from time to time. Changes will be
        reflected on this page with a revised “Last Updated” date.
      </p>

      {/* Last Updated */}
      <p className="text-gray-500 text-sm mt-8">
        Last Updated: August 14, 2025
      </p>
    </div>
    </Layout>
  )
}

export default Policy