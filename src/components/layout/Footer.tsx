import { Instagram, Linkedin, Mail, Dribbble } from "lucide-react";
import { navLinks } from "@/data/nav";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

const socialLinks = [
  { icon: Instagram, href: siteConfig.social.instagram, label: "انستغرام" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "لينكدإن" },
  { icon: Dribbble, href: siteConfig.social.behance, label: "بيهانس" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "البريد الإلكتروني" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-bg-soft">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-start lg:justify-between lg:text-right">
          <div className="max-w-sm">
            <a
              href="#hero"
              className="font-arabic text-2xl font-extrabold text-white"
            >
              علام <span className="text-primary">المطري</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              مصمم جرافيك ومبدع رقمي أساعد العلامات التجارية على التميز
              بهوية بصرية قوية وحلول إبداعية مدعومة بالذكاء الاصطناعي.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-white">روابط سريعة</h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted">
              {navLinks.slice(0, 8).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-white">تواصل معي</h4>
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor="hover"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:border-primary hover:bg-primary hover:text-black"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} علام المطري. جميع الحقوق محفوظة.</span>
          <span>صُمم وبُرمج بشغف في المملكة العربية السعودية</span>
        </div>
      </div>
    </footer>
  );
}
