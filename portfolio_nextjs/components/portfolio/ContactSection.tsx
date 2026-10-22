import { Github, Linkedin, Mail } from "lucide-react";

const contacts = [
  { icon: Mail, text: "doharsiregar10@gmail.com", href: "mailto:doharsiregar10@gmail.com" },
  { icon: Linkedin, text: "linkedin.com/in/dohar-siregar", href: "https://www.linkedin.com/in/dohar-siregar/" },
  { icon: Github, text: "github.com/DoharDNR", href: "https://github.com/DoharDNR" },
] as const;

export function ContactSection() {
  return (
    <section className="border-t border-line bg-background px-6 py-12 md:px-12.5" id="contact" aria-labelledby="contact-title">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mb-10 text-center">
          <h2 id="contact-title" className="text-[clamp(1.85rem,4vw,2.25rem)] font-bold leading-[1.15] tracking-[-.04em]">Get In Touch</h2>
          <p className="mx-auto mt-3 max-w-[500px] text-muted">I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
        </header>
        <nav className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-label="Contact links">
          {contacts.map(({ icon: Icon, text, href }) => {
            const external = href.startsWith("http");
            return <a className="flex items-center justify-start gap-3 rounded-lg border border-line bg-card px-6 py-5 text-accent transition-colors hover:bg-accent-soft md:justify-center" key={href} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}><Icon aria-hidden="true" /><span>{text}</span></a>;
          })}
        </nav>
      </div>
    </section>
  );
}
