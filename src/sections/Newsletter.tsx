import { NewsletterSpheres } from "../svg/NewsletterSpheres";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Section } from "../components/Section";


const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/GM%20Pro:%20Supercharge%20Your%20Google%20Meet%20Experience/bfmgohplnhblcajmjhmcimjlikohiomh";

const Background = () => (
  <div
    className="absolute bottom-0 right-0 hidden pointer-events-none md:block"
    aria-hidden="true"
  >
    <NewsletterSpheres />
  </div>
);

export const Newsletter = () => {
  return (
    <Section className="px-4 dark sm:px-12">
      <Card className="w-full px-4 py-16 overflow-hidden sm:px-16">
        <Background />
        <div className="gap-6 text-center md:text-left col md:w-1/2 ">
          <h2 className="text-3xl font-bold text-gray-100">
            Ready to transform your Google Meet experience?
          </h2>
          <p className="text-lg text-light">
            Join thousands of users who have already enhanced their meetings
            with GM Pro. Install now and discover the difference!
          </p>
          <div className="flex gap-4">
            <Button onClick={() => window.open(CHROME_STORE_URL, "_blank")}>
              Add to Chrome — It&apos;s Free
            </Button>
          </div>
          <p className="text-sm text-gray-400">⭐ 5.0 rating • Free forever</p>
        </div>
      </Card>
    </Section>
  );
};
