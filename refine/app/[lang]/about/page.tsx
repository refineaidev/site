import { LangProps, getDictionary } from "@/lib/dictionaries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RefineAI - About",
};
// Static generation support for all languages
export async function generateStaticParams() {
  const languages = ["en", "ar"];
  return languages.map((lang) => ({ lang }));
}


export default async function AboutPage({ params }: LangProps) {
  const { lang } = await params; 
  const dict = await getDictionary(lang);

  return (
    <section className="py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{dict.about.heading}</h1>
      <p className="mb-4 text-lg text-muted-foreground">{dict.about.paragraph1}</p>
      <p className="mb-4 text-lg text-muted-foreground">{dict.about.paragraph2}</p>
      <p className="text-lg text-muted-foreground">{dict.about.paragraph3}</p>
    </section>
  );
}

