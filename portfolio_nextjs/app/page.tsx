import AboutSection from "@/components/portfolio/AboutSection";
import { ContactSection } from "@/components/portfolio/ContactSection";

export const metadata = {
  title: "Dohar Siregar - Full-Stack Web Developer & Designer",
  description: "Portfolio of Dohar Siregar, a full-stack web developer and designer creating digital experiences.",
};

export default function Home() {
  return <main><AboutSection /><ContactSection /></main>;
}
