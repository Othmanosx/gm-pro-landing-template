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
            src="https://lh3.googleusercontent.com/oEMr1ptQCg81T6dBLdb53OfI73whvbqyCvlZ7mt1UAFbRwFchkB29Cn2x_5KdpZURYDuulqGanQu3EfD3Tjmrd0f=s120"
            alt="GM Pro Logo"
            height="40"
            width="40"
            className="rounded-lg"
          />
          <div className="text-sm text-light">
            &copy; GM Pro {new Date().getFullYear()}
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
          <LinkButton
            href={CHROME_STORE_URL}
            aria-label="Get GM Pro on Chrome Web Store"
          >
            Get it on Chrome Web Store
          </LinkButton>
        </div>
      </div>
    </footer>
  );
};
