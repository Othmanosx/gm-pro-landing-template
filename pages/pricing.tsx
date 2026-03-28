import { Footer } from "../src/sections/Footer";
import { Header } from "../src/sections/Header";
import { Pricing } from "../src/sections/Pricing";
import { NextSeo } from "next-seo";

const PricingPage = ({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  return (
    <>
      <NextSeo
        title="Pricing — Better Chat for Google Meet"
        description="Choose a plan that fits you. Pro subscription or one-time lifetime access to Enhanced Chat, transcriptions, image sharing, and more."
      />
      <div className="overflow-hidden col text-strong">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <Pricing />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PricingPage;
