import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { ArrowLeft } from 'lucide-react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Cookie Policy - Figurely' },
    { name: 'description', content: 'Cookie Policy for Figurely - Learn how we use cookies and similar technologies.' },
  ];
};

export default function CookiePolicy() {
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
            Cookie Policy
          </h1>
          <p className='mt-2 text-neutral-600 dark:text-neutral-400'>
            Last updated: November 29, 2025
          </p>

          <div className='mt-8 space-y-8 text-neutral-700 dark:text-neutral-300'>
            {/* Introduction */}
            <section>
              <p>
                This Cookie Policy explains how Figurely ("we," "our," or "us") uses cookies
                and similar technologies when you visit our website or use our services.
                By using Figurely, you consent to the use of cookies as described in this policy.
              </p>
            </section>

            {/* What Are Cookies */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                1. What Are Cookies?
              </h2>
              <p className='mt-4'>
                Cookies are small text files that are stored on your device (computer, tablet,
                or mobile phone) when you visit a website. They are widely used to make websites
                work more efficiently, provide a better user experience, and give website owners
                information about how their site is being used.
              </p>
              <p className='mt-4'>
                Similar technologies include local storage, session storage, and pixels, which
                serve similar purposes to cookies.
              </p>
            </section>

            {/* How We Use Cookies */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                2. How We Use Cookies
              </h2>
              <p className='mt-4'>We use cookies for the following purposes:</p>
              <ul className='mt-4 list-inside list-disc space-y-2'>
                <li>
                  <strong>Authentication:</strong> To keep you signed in and maintain your session
                </li>
                <li>
                  <strong>Security:</strong> To protect your account and prevent fraud
                </li>
                <li>
                  <strong>Preferences:</strong> To remember your settings and preferences
                </li>
                <li>
                  <strong>Functionality:</strong> To enable features and improve your experience
                </li>
              </ul>
            </section>

            {/* Types of Cookies We Use */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                3. Types of Cookies We Use
              </h2>
              <div className='mt-4 space-y-4'>
                <div>
                  <h3 className='font-medium text-neutral-900 dark:text-neutral-100'>
                    Essential Cookies
                  </h3>
                  <p className='mt-1'>
                    These cookies are necessary for the website to function properly. They enable
                    core functionality such as authentication, security, and session management.
                    You cannot opt out of these cookies as the Service would not work without them.
                  </p>
                </div>
                <div>
                  <h3 className='font-medium text-neutral-900 dark:text-neutral-100'>
                    Functional Cookies
                  </h3>
                  <p className='mt-1'>
                    These cookies enable enhanced functionality and personalization, such as
                    remembering your preferences and settings. If you disable these cookies,
                    some features may not work as intended.
                  </p>
                </div>
                <div>
                  <h3 className='font-medium text-neutral-900 dark:text-neutral-100'>
                    Analytics Cookies
                  </h3>
                  <p className='mt-1'>
                    We may use analytics cookies to understand how visitors interact with our
                    website. This helps us improve our Service and user experience. These cookies
                    collect information anonymously.
                  </p>
                </div>
              </div>
            </section>

            {/* Specific Cookies We Use */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                4. Specific Cookies We Use
              </h2>
              <div className='mt-4 overflow-x-auto'>
                <table className='w-full border-collapse text-sm'>
                  <thead>
                    <tr className='border-b'>
                      <th className='py-2 pr-4 text-left font-medium'>Cookie Name</th>
                      <th className='py-2 pr-4 text-left font-medium'>Purpose</th>
                      <th className='py-2 text-left font-medium'>Duration</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y'>
                    <tr>
                      <td className='py-2 pr-4'>sb-*-auth-token</td>
                      <td className='py-2 pr-4'>Authentication session (Supabase)</td>
                      <td className='py-2'>Session</td>
                    </tr>
                    <tr>
                      <td className='py-2 pr-4'>sb-*-auth-token-code-verifier</td>
                      <td className='py-2 pr-4'>OAuth security (Supabase)</td>
                      <td className='py-2'>Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                5. Third-Party Cookies
              </h2>
              <p className='mt-4'>
                We may use third-party services that set their own cookies. These third parties
                include:
              </p>
              <ul className='mt-4 list-inside list-disc space-y-2'>
                <li>
                  <strong>Supabase:</strong> For authentication and session management
                </li>
                <li>
                  <strong>Analytics providers:</strong> To help us understand how our Service
                  is used (if enabled)
                </li>
              </ul>
              <p className='mt-4'>
                We do not control these third-party cookies. Please refer to their respective
                privacy and cookie policies for more information.
              </p>
            </section>

            {/* Managing Cookies */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                6. Managing Cookies
              </h2>
              <p className='mt-4'>
                Most web browsers allow you to control cookies through their settings. You can
                typically find these settings in the "Options" or "Preferences" menu of your
                browser. The following links provide information on how to manage cookies in
                popular browsers:
              </p>
              <ul className='mt-4 list-inside list-disc space-y-2'>
                <li>
                  <a
                    href='https://support.google.com/chrome/answer/95647'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline'>
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href='https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline'>
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href='https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline'>
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href='https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline'>
                    Microsoft Edge
                  </a>
                </li>
              </ul>
              <p className='mt-4'>
                Please note that disabling cookies may affect the functionality of our Service.
                If you disable essential cookies, you may not be able to log in or use certain
                features.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                7. Changes to This Policy
              </h2>
              <p className='mt-4'>
                We may update this Cookie Policy from time to time to reflect changes in our
                practices or for other operational, legal, or regulatory reasons. We will post
                any changes on this page and update the "Last updated" date.
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                8. Contact Us
              </h2>
              <p className='mt-4'>
                If you have any questions about our use of cookies or this Cookie Policy,
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
