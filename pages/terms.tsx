import Head from "next/head";
import Link from "next/link";
import { Header } from "../src/sections/Header";
import { Footer } from "../src/sections/Footer";

const TermsOfService = ({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  return (
    <div className="overflow-hidden col text-strong">
      <Head>
        <title>Terms of Service - GM Pro</title>
        <meta
          name="description"
          content="Terms of Service for GM Pro Chrome Extension"
        />
      </Head>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <article className="prose dark:prose-invert prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-light mb-8">Last updated: December 14, 2024</p>

          <p>
            Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms
            of Service&quot;) carefully before using the GM Pro Chrome extension
            (the &quot;Service&quot;) operated by GM Pro (&quot;us&quot;,
            &quot;we&quot;, or &quot;our&quot;).
          </p>

          <p>
            Your access to and use of the Service is conditioned on your
            acceptance of and compliance with these Terms. These Terms apply to
            all visitors, users, and others who access or use the Service.
          </p>

          <p>
            <strong>
              By accessing or using the Service you agree to be bound by these
              Terms. If you disagree with any part of the terms, then you may
              not access the Service.
            </strong>
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            1. Description of Service
          </h2>
          <p>
            GM Pro is a Chrome browser extension designed to enhance your Google
            Meet experience. The Service provides additional features including
            but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Enhanced chat interface with persistent message history</li>
            <li>Dark mode for chat</li>
            <li>Automatic microphone and camera controls</li>
            <li>Auto-join meeting functionality</li>
            <li>Real-time meeting transcription</li>
            <li>Lobby notifications</li>
            <li>Message reactions and replies</li>
            <li>Image and GIF sharing in chat</li>
            <li>Attendee list shuffling</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            2. Use of Google Services
          </h2>
          <p>
            GM Pro interacts with Google Meet, a service provided by Google LLC.
            By using GM Pro, you acknowledge and agree that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You must comply with Google&apos;s Terms of Service and Google
              Meet&apos;s terms of use when using our Service.
            </li>
            <li>
              GM Pro is not affiliated with, endorsed by, or sponsored by Google
              LLC.
            </li>
            <li>
              Google Meet and related trademarks are the property of Google LLC.
            </li>
            <li>
              Changes to Google Meet&apos;s platform or policies may affect the
              functionality of GM Pro, and we are not responsible for any such
              changes.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            3. User Accounts and Authentication
          </h2>
          <p>
            Some features of GM Pro may require authentication through your
            Google account. When you authenticate:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You authorize GM Pro to access certain information as described in
              our Privacy Policy.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
            <li>
              You agree to accept responsibility for all activities that occur
              under your account.
            </li>
            <li>
              You may revoke GM Pro&apos;s access to your Google account at any
              time through your Google Account settings.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Acceptable Use</h2>
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Violate any applicable laws, regulations, or third-party rights.
            </li>
            <li>
              Interfere with or disrupt the integrity or performance of Google
              Meet or any other services.
            </li>
            <li>
              Attempt to gain unauthorized access to any systems or networks.
            </li>
            <li>Transmit any malware, viruses, or other malicious code.</li>
            <li>Harass, abuse, or harm other users or meeting participants.</li>
            <li>
              Record or transcribe meetings without the consent of all
              participants where required by law.
            </li>
            <li>Use the Service for any illegal or unauthorized purpose.</li>
            <li>Reverse engineer, decompile, or disassemble the Service.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            5. Intellectual Property
          </h2>
          <p>
            The Service and its original content, features, and functionality
            are and will remain the exclusive property of GM Pro and its
            licensors. The Service is protected by copyright, trademark, and
            other laws of both Iraq and foreign countries.
          </p>
          <p>
            Our trademarks and trade dress may not be used in connection with
            any product or service without the prior written consent of GM Pro.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. User Content</h2>
          <p>
            Our Service may allow you to share content such as messages, images,
            and GIFs within Google Meet chat. You retain ownership of any
            content you share, but you grant us a license to use, store, and
            process such content solely for the purpose of providing the
            Service.
          </p>
          <p>You represent and warrant that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You own or have the necessary rights to share the content.</li>
            <li>
              Your content does not violate the rights of any third party.
            </li>
            <li>
              Your content complies with all applicable laws and regulations.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Privacy</h2>
          <p>
            Your use of the Service is also governed by our Privacy Policy,
            which describes how we collect, use, and protect your information.
            Please review our{" "}
            <Link
              href="/privacy"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            to understand our practices.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Data Processing</h2>
          <p>
            GM Pro processes certain data locally on your device to provide its
            features. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Chat messages for persistent history functionality</li>
            <li>Meeting transcriptions for the transcription feature</li>
            <li>User preferences and settings</li>
            <li>Participant information for meeting management features</li>
          </ul>
          <p>
            We are committed to protecting your data and processing it in
            accordance with applicable data protection laws.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            9. Disclaimer of Warranties
          </h2>
          <p>
            The Service is provided on an &quot;AS IS&quot; and &quot;AS
            AVAILABLE&quot; basis. GM Pro makes no warranties, expressed or
            implied, and hereby disclaims and negates all other warranties
            including, without limitation:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Implied warranties of merchantability, fitness for a particular
              purpose, and non-infringement.
            </li>
            <li>
              That the Service will be uninterrupted, timely, secure, or
              error-free.
            </li>
            <li>
              That the results obtained from the use of the Service will be
              accurate or reliable.
            </li>
            <li>That any errors in the Service will be corrected.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            10. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, in no event shall
            GM Pro, its directors, employees, partners, agents, suppliers, or
            affiliates be liable for any indirect, incidental, special,
            consequential, or punitive damages, including without limitation:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Loss of profits, data, use, goodwill, or other intangible losses
            </li>
            <li>
              Damages resulting from unauthorized access to or use of our
              Service
            </li>
            <li>
              Damages resulting from any interruption or cessation of the
              Service
            </li>
            <li>
              Damages resulting from any bugs, viruses, or other harmful code
              transmitted through the Service
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">11. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless GM Pro and its
            licensees, licensors, employees, contractors, agents, officers, and
            directors from and against any and all claims, damages, obligations,
            losses, liabilities, costs, or debt, and expenses (including but not
            limited to attorney&apos;s fees) arising from:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your use of and access to the Service</li>
            <li>Your violation of any term of these Terms</li>
            <li>
              Your violation of any third-party right, including without
              limitation any copyright, property, or privacy right
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">12. Termination</h2>
          <p>
            We may terminate or suspend your access to the Service immediately,
            without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms.
          </p>
          <p>
            Upon termination, your right to use the Service will immediately
            cease. You may also uninstall the extension at any time to terminate
            your use of the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">13. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will try to
            provide at least 30 days&apos; notice prior to any new terms taking
            effect.
          </p>
          <p>
            What constitutes a material change will be determined at our sole
            discretion. By continuing to access or use our Service after those
            revisions become effective, you agree to be bound by the revised
            terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">14. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the
            laws of Iraq, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">15. Severability</h2>
          <p>
            If any provision of these Terms is held to be unenforceable or
            invalid, such provision will be changed and interpreted to
            accomplish the objectives of such provision to the greatest extent
            possible under applicable law, and the remaining provisions will
            continue in full force and effect.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">16. Entire Agreement</h2>
          <p>
            These Terms constitute the entire agreement between us regarding our
            Service and supersede and replace any prior agreements we might have
            between us regarding the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">17. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              By email:{" "}
              <a
                href="mailto:othman@gm-pro.online"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                othman@gm-pro.online
              </a>
            </li>
          </ul>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
