'use client';

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="sticky bottom-0 left-0 -z-1 animate-fade-in">
      <footer className="p-8 bg-rose-50 text-center font-sans">
        <p>
          &copy; {year} – Grand Format is the vegan vinyl DJ in the Hudson
          Valley
        </p>
      </footer>
    </div>
  );
}
