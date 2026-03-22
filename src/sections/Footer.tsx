import Link from "next/link";
import { LinkButton } from "../components/LinkButton";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/GM%20Pro:%20Supercharge%20Your%20Google%20Meet%20Experience/bfmgohplnhblcajmjhmcimjlikohiomh";

export const Footer = () => {
  return (
    <footer className="bg-extra-strong">
      <div className="items-center justify-between px-10 py-4 mx-auto sm:px-6 row max-w-7xl">
        <div className="items-center gap-4 row">
          <img
            src="/images/logo.svg"
            alt="Better Chat Logo"
            height="40"
            width="40"
            className="rounded-lg"
          />
          <div className="text-sm text-light">
            &copy; Better Chat {new Date().getFullYear()}
          </div>
        </div>
        <div className="items-center gap-4 row">
          <Link
            href="/privacy"
            className="text-sm text-light hover:text-gray-300"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-light hover:text-gray-300"
          >
            Terms of Service
          </Link>
          <Link
            href="/support"
            className="text-sm text-light hover:text-gray-300"
          >
            Support
          </Link>
          <LinkButton
            href={CHROME_STORE_URL}
            aria-label="Get Better Chat on Chrome Web Store"
          >
            Get it on Chrome Web Store
          </LinkButton>
        </div>
      </div>
    </footer>
  );
};
