import { site } from '@/content/site';

/** Dark brown bar with pink text and icon: the contact panel's pair reversed (9.43:1). */
export default function Footer() {
  return (
    <footer className="site-footer flex flex-wrap items-center justify-center gap-x-2 px-4 py-4">
      <p>
        &copy; {new Date().getFullYear()} {site.name}
      </p>
      {/* Icon-only link. Its name ("Instagram") is read by screen readers but
          not shown; the 44px square keeps the tap target at AAA size. */}
      <a
        href={site.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-[rgb(247_183_206/0.15)]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6 flex-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
        <span className="sr-only">Instagram (opens in a new tab)</span>
      </a>
    </footer>
  );
}
