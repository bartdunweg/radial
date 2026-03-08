import blogEn from "@/content/en/blog.json";
import blogNl from "@/content/nl/blog.json";
import workEn from "@/content/en/work.json";
import workNl from "@/content/nl/work.json";
import servicesEn from "@/content/en/services.json";
import servicesNl from "@/content/nl/services.json";
import pricingEn from "@/content/en/pricing.json";
import pricingNl from "@/content/nl/pricing.json";
import testimonialsEn from "@/content/en/testimonials.json";
import testimonialsNl from "@/content/nl/testimonials.json";

const content = {
  en: { blog: blogEn, work: workEn, services: servicesEn, pricing: pricingEn, testimonials: testimonialsEn },
  nl: { blog: blogNl, work: workNl, services: servicesNl, pricing: pricingNl, testimonials: testimonialsNl },
};

export function getContent(locale: string) {
  return content[locale as keyof typeof content] ?? content.en;
}
