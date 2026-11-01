import { site } from '@/content/site';

export default function Footer() {
  return (
    <footer className="bg-rose-50 p-8 text-center">
      <p>
        &copy; {new Date().getFullYear()} – {site.name} is the vegan vinyl DJ in
        the {site.region.replace(', NY', '')}
      </p>
    </footer>
  );
}
