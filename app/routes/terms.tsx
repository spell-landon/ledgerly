import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { ArrowLeft } from 'lucide-react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Terms of Service - Figurely' },
    { name: 'description', content: 'Terms of Service for Figurely - Read our terms and conditions for using our service.' },
  ];
};

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className='mt-2 text-neutral-600 dark:text-neutral-400'>
            Last updated: November 29, 2025
          </p>

          <div className='mt-8 space-y-8 text-neutral-700 dark:text-neutral-300'>
            {/* Introduction */}
            <section>
              <p>
                Welcome to Figurely. These Terms of Service ("Terms") govern your access to and
                use of the Figurely website, applications, and services (collectively, the "Service").
                Please read these Terms carefully before using our Service.
              </p>
              <p className='mt-4'>
                By accessing or using the Service, you agree to be bound by these Terms. If you
                do not agree to these Terms, you may not access or use the Service.
              </p>
            </section>

            {/* Description of Service */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                1. Description of Service
              </h2>
              <p className='mt-4'>
                Figurely is an invoice and expense management platform designed for freelancers
                and small businesses. The Service allows you to create and send invoices, track
                expenses, manage clients, log mileage, and generate financial reports.
              </p>
            </section>

            {/* Account Registration */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                2. Account Registration
              </h2>
              <p className='mt-4'>
                To use certain features of the Service, you must create an account. When you
                create an account, you agree to:
              </p>
              <ul className='mt-4 list-inside list-disc space-y-2'>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security and confidentiality of your login credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                3. Acceptable Use
              </h2>
              <p className='mt-4'>You agree not to use the Service to:</p>
              <ul className='mt-4 list-inside list-disc space-y-2'>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the intellectual property rights of others</li>
                <li>Transmit any malicious code, viruses, or harmful content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use the Service for fraudulent invoicing or deceptive practices</li>
                <li>Harass, abuse, or harm another person</li>
                <li>Send spam or unsolicited communications through the Service</li>
              </ul>
            </section>

            {/* Your Content */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                4. Your Content
              </h2>
              <p className='mt-4'>
                You retain ownership of all content you submit to the Service, including invoices,
                expenses, client information, and uploaded files ("Your Content"). By using the
                Service, you grant us a limited license to store, process, and display Your Content
                solely for the purpose of providing the Service to you.
              </p>
              <p className='mt-4'>
                You are solely responsible for Your Content and represent that you have all
                necessary rights to submit it to the Service.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                5. Intellectual Property
              </h2>
              <p className='mt-4'>
                The Service and its original content (excluding Your Content), features, and
                functionality are owned by Figurely and are protected by international copyright,
                trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className='mt-4'>
                Our trademarks and trade dress may not be used in connection with any product
                or service without our prior written consent.
              </p>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                6. Payment Terms
              </h2>
              <p className='mt-4'>
                Certain features of the Service may require payment. If you choose to use paid
                features, you agree to pay all applicable fees as described on our pricing page.
                All fees are non-refundable except as required by law or as explicitly stated
                in these Terms.
              </p>
              <p className='mt-4'>
                We reserve the right to change our pricing at any time. We will provide you with
                reasonable notice of any price changes before they take effect.
              </p>
            </section>

            {/* Disclaimer of Warranties */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                7. Disclaimer of Warranties
              </h2>
              <p className='mt-4'>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY
                KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className='mt-4'>
                We do not warrant that the Service will be uninterrupted, secure, or error-free,
                or that any defects will be corrected. We are not responsible for any financial,
                tax, or legal decisions you make based on information from the Service.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                8. Limitation of Liability
              </h2>
              <p className='mt-4'>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, FIGURELY SHALL NOT BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING
                BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, ARISING
                OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
              </p>
              <p className='mt-4'>
                Our total liability for any claims arising from or related to the Service shall
                not exceed the amount you paid us, if any, during the twelve (12) months prior
                to the claim.
              </p>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                9. Indemnification
              </h2>
              <p className='mt-4'>
                You agree to indemnify and hold harmless Figurely and its officers, directors,
                employees, and agents from any claims, damages, losses, or expenses (including
                reasonable attorneys' fees) arising from your use of the Service, your violation
                of these Terms, or your violation of any rights of another party.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                10. Termination
              </h2>
              <p className='mt-4'>
                You may terminate your account at any time by contacting us or using the account
                deletion feature in the Service. We may suspend or terminate your access to the
                Service at any time, with or without cause, and with or without notice.
              </p>
              <p className='mt-4'>
                Upon termination, your right to use the Service will immediately cease. All
                provisions of these Terms that by their nature should survive termination shall
                survive, including ownership provisions, warranty disclaimers, and limitations
                of liability.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                11. Changes to Terms
              </h2>
              <p className='mt-4'>
                We reserve the right to modify these Terms at any time. We will provide notice
                of material changes by posting the updated Terms on this page and updating the
                "Last updated" date. Your continued use of the Service after any changes
                constitutes your acceptance of the new Terms.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                12. Governing Law
              </h2>
              <p className='mt-4'>
                These Terms shall be governed by and construed in accordance with the laws of
                the United States, without regard to its conflict of law provisions. Any disputes
                arising from these Terms or the Service shall be resolved in the courts of
                competent jurisdiction.
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                13. Contact Us
              </h2>
              <p className='mt-4'>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className='mt-4'>
                <strong>Email:</strong> legal@figurely.co
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
