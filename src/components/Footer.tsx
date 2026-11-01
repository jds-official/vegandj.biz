import { site } from '@/content/site';

/** Same pink and brown as the contact panel it follows (9.43:1). */
export default function Footer() {
  return (
    <footer className="site-footer p-8 text-center">
      <nav className="mb-4 flex justify-center gap-6">
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer">
          TikTok
        </a>
      </nav>
      <p className="mx-auto">
        &copy; {new Date().getFullYear()} – {site.name} is the vegan vinyl DJ in
        the {site.region.replace(', NY', '')}
      </p>
    </footer>
  );
}
