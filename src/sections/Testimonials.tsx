/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";

import { Quote } from "../svg/Quote";
import { Card } from "../components/Card";
import { Details } from "../components/Details";
import { GradientText } from "../components/GradientText";
import { Section } from "../components/Section";
import { Title } from "../components/Title";


const TestimonialImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="absolute mx-auto -top-10">
      <Quote />
      <img
        className="rounded-full w-24 h-24 object-cover"
        src={src}
        width="96"
        height="96"
        alt={alt}
      />
    </div>
  );
};

const TestimonialText = ({
  quote,
  name,
  date,
}: {
  quote: string;
  name: string;
  date: string;
}) => {
  return (
    <>
      <blockquote className="font-medium">&quot;{quote}&quot;</blockquote>
      <div className="">
        <cite className="not-italic font-bold">— {name}</cite>
        <div className="text-base text-light">
          <span>{date}</span> <span className="text-amber-500">★★★★★</span>
        </div>
      </div>
    </>
  );
};

const Testimonial = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="items-center gap-6 p-12 pt-20 body-lg col text-medium">
      {children}
    </Card>
  );
};

export const Testimonials = () => {
  return (
    <Section grayer className="gap-24 text-center">
      {/* Header */}
      <div className="gap-4 col">
        <Title size="md">
          <GradientText className="amber-red">Loved</GradientText> by users
        </Title>
        <Details>
          5 out of 5 stars • See what our users are saying about GM Pro.
        </Details>
      </div>
      {/* Testimonials */}
      <div className="gap-20 md:gap-6 col md:row">
        {/* Testimonial 1 - Gee Nim */}
        <Testimonial>
          <TestimonialImage
            src="https://lh3.googleusercontent.com/a-/ALV-UjWwF-LVIX4j65CLk-amBJjPpXAz8yCb3BNBNjFBUlIXmydpu6T0=s96-w96-h96"
            alt="Gee Nim"
          />
          <TestimonialText
            quote="I've been using this for a while now and it has actually made meetings a bit more fun since there's an option to react an emoji to another person's message!"
            name="Gee Nim"
            date="Dec 2, 2025"
          />
        </Testimonial>
        {/* Testimonial 2 - Anshul */}
        <Testimonial>
          <TestimonialImage
            src="https://lh3.googleusercontent.com/a/default-user=s96-w96-h96"
            alt="Anshul"
          />
          <TestimonialText quote="love it" name="Anshul" date="Oct 22, 2025" />
        </Testimonial>
        {/* Testimonial 3 - Matias Meyer */}
        <Testimonial>
          <TestimonialImage
            src="https://lh3.googleusercontent.com/a-/ALV-UjXPQcCiPuZV7yyAd53iqLGGNn3bvL7KzZoCVZMJg49KswOGX1tO=s96-w96-h96"
            alt="Matias Meyer"
          />
          <TestimonialText
            quote="Just amazing!!!"
            name="Matias Meyer"
            date="Jun 7, 2025"
          />
        </Testimonial>
      </div>
    </Section>
  );
};
