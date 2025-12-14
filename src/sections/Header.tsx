import Link from "next/link";
import { useState, useEffect } from "react";
import { useEventListener } from "usehooks-ts";

import { Button } from "../components/Button";
import { GradientText } from "../components/GradientText";
import { LinkButton } from "../components/LinkButton";
import { Moon, Sun } from "../svg/DarkModeIcons";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/GM%20Pro:%20Supercharge%20Your%20Google%20Meet%20Experience/bfmgohplnhblcajmjhmcimjlikohiomh";

export const Header = ({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  const [top, setTop] = useState(true);
  const [nextSection, setNextSection] = useState(false);
  const [reloaded, setReloaded] = useState(false);

  // Handle scrolling logic
  const handleScroll = () => {
    setTop(window.pageYOffset <= 10);
    setNextSection(window.pageYOffset > window.innerHeight);
  };
  useEventListener("scroll", handleScroll);

  // Clean up stale dark mode
  useEffect(() => {
    setReloaded(true);
  }, []);

  const goToChromeStore = () => {
    window.open(CHROME_STORE_URL, "_blank");
  };

  const Logo = () => (
    <Link href="/">
      <div className="items-center block gap-2 row">
        <img
          src="https://lh3.googleusercontent.com/oEMr1ptQCg81T6dBLdb53OfI73whvbqyCvlZ7mt1UAFbRwFchkB29Cn2x_5KdpZURYDuulqGanQu3EfD3Tjmrd0f=s120"
          alt="GM Pro logo"
          height="40"
          width="40"
          className="rounded-lg"
        />
        <div className="text-2xl font-bold">
          <GradientText className="pink-blue">GM Pro</GradientText>
        </div>
      </div>
    </Link>
  );

  const Navigation = () => (
    <nav>
      <ul className="items-center gap-2 row">
        {reloaded ? ( // Only show after first reload
          <li>
            <LinkButton
              button
              onClick={toggleDarkMode}
              title="Toggle dark mode"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Moon /> : <Sun />}
            </LinkButton>
          </li>
        ) : null}
        <li>
          <LinkButton href="#features">Features</LinkButton>
        </li>
        <li className={`transition ${!nextSection && "hidden"}`}>
          <Button onClick={goToChromeStore}>Add to Chrome</Button>
        </li>
      </ul>
    </nav>
  );

  return (
    // Colors must be set explicitly since opacity and blur don't work together
    <header
      className={`fixed w-full z-30 transition duration-300 ${
        !top && "bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg"
      }`}
    >
      {/* Header Content */}
      <div className="items-center justify-between h-16 px-5 mx-auto row md:h-20 max-w-7xl sm:px-6">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};
