import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { ArrowLeft } from 'lucide-react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Privacy Policy - Figurely' },
    { name: 'description', content: 'Privacy Policy for Figurely - Learn how we collect, use, and protect your data.' },
  ];
};

export default function PrivacyPolicy() {
  return (
    <div className='min-h-screen bg-white dark:bg-neutral-950'>
      {/* Header */}
      <header className='border-b bg-white/80 backdrop-blur-sm dark:bg-neutral-950/80'>
        <div className='container mx-auto flex items-center gap-4 px-4 py-4'>
          <Link
            to='/'
            className='flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'>
            <ArrowLeft className='h-4 w-4' />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className='container mx-auto px-4 py-12 md:py-16'>
        <div className='mx-auto max-w-3xl'>
          <h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
            Privacy Policy
          </h1>
          <p className='mt-2 text-neutral-600 dark:text-neutral-400'>
            Last updated: November 29, 2025
          </p>

          <div className='mt-8 space-y-8 text-neutral-700 dark:text-neutral-300'>
            {/* Introduction */}
            <section>
              <p>
                At Figurely ("we," "our," or "us"), we are committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you use our invoice and expense management service.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                1. Information We Collect
              </h2>
              <div className='mt-4 space-y-4'>
                <div>
                  <h3 className='font-medium text-neutral-900 dark:text-neutral-100'>
                    Account Information
                  </h3>
                  <p className='mt-1'>
                    When you create an account, we collect your email address, password (encrypted),
                    and optional profile information such as your full name.
                  </p>
                </div>
                <div>
                  <h3 className='font-medium text-neutral-900 dark:text-neutral-100'>
                    Business Information
                  </h3>
                  <p className='mt-1'>
                    We collect business details you provide, including business name, address,
                    phone number, tax identification numbers, and logo images.
                  </p>
                </div>
                <div>
                  <h3 className='font-medium text-neutral-900 dark:text-neutral-100'>
                    Financial Data
                  </h3>
                  <p className='mt-1'>
                    We store invoice details, expense records, client information, mileage logs,
                    and payment information that you enter into the platform.
                  </p>
                </div>
                <div>
                  <h3 className='font-medium text-neutral-900 dark:text-neutral-100'>
                    Uploaded Files
                  </h3>
                  <p className='mt-1'>
                    We store receipt images, business logos, and other files you upload to the service.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                2. How We Use Your Information
              </h2>
              <ul className='mt-4 list-inside list-disc space-y-2'>
                <li>To provide, maintain, and improve our services</li>
                <li>To process and manage your invoices, expenses, and financial records</li>
                <li>To send invoice emails to your clients on your behalf</li>
                <li>To generate PDF invoices and reports</li>
                <li>To communicate with you about your account and service updates</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To detect, prevent, and address technical issues or security threats</li>
              </ul>
            </section>

            {/* Data Storage and Security */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                3. Data Storage and Security
              </h2>
              <p className='mt-4'>
                Your data is stored securely using industry-standard encryption and security practices.
                We use Supabase for our database and authentication infrastructure, which provides:
              </p>
              <ul className='mt-4 list-inside list-disc space-y-2'>
                <li>Encryption at rest and in transit</li>
                <li>Row-level security ensuring you can only access your own data</li>
                <li>Regular security audits and compliance certifications</li>
                <li>Secure authentication with password hashing</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                4. Third-Party Services
              </h2>
              <p className='mt-4'>We use the following third-party services:</p>
              <ul className='mt-4 list-inside list-disc space-y-2'>
                <li>
                  <strong>Supabase:</strong> Database hosting, authentication, and file storage
                </li>
                <li>
                  <strong>Resend:</strong> Email delivery for sending invoices to your clients
                </li>
                <li>
                  <strong>Vercel:</strong> Application hosting and deployment
                </li>
              </ul>
              <p className='mt-4'>
                These services have their own privacy policies and data handling practices.
                We encourage you to review their policies.
              </p>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                5. Data Sharing
              </h2>
              <p className='mt-4'>
                We do not sell, trade, or rent your personal information to third parties.
                We may share your information only in the following circumstances:
              </p>
              <ul className='mt-4 list-inside list-disc space-y-2'>
                <li>With your consent or at your direction</li>
                <li>To comply with legal obligations or respond to lawful requests</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                6. Your Rights
              </h2>
              <p className='mt-4'>You have the right to:</p>
              <ul className='mt-4 list-inside list-disc space-y-2'>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your account and associated data</li>
                <li>Export your data in a portable format</li>
                <li>Withdraw consent for data processing where applicable</li>
              </ul>
              <p className='mt-4'>
                To exercise these rights, please contact us using the information below.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                7. Data Retention
              </h2>
              <p className='mt-4'>
                We retain your data for as long as your account is active or as needed to provide
                you services. If you delete your account, we will delete your personal data within
                30 days, except where we are required to retain it for legal or regulatory purposes.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                8. Changes to This Policy
              </h2>
              <p className='mt-4'>
                We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the "Last updated"
                date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                9. Contact Us
              </h2>
              <p className='mt-4'>
                If you have any questions about this Privacy Policy or our data practices,
                please contact us at:
              </p>
              <p className='mt-4'>
                <strong>Email:</strong> privacy@figurely.co
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='border-t py-8'>
        <div className='container mx-auto px-4 text-center text-sm text-neutral-600 dark:text-neutral-400'>
          &copy; {new Date().getFullYear()} Figurely. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
