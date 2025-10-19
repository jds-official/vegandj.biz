import Image from 'next/image';

export default function GrandFormat() {
  const linkText = `I'm also Grand Format, the vegan vinyl DJ in the Hudson Valley, NY`;

  return (
    <div className="relative text-center w-83 sm:text-left">
      <a href="https://vegandj.biz" target="_blank" rel="noopener noreferrer">
        <Image
          className="m-[0_auto] w-60 md:w-full"
          src="/images/grand-format.webp"
          alt="Grand Format Peanut Chews Logo"
          width={400}
          height={200}
        />
        <p className="font-script font-bold text-lg xs:text-2xl relative mt-2 xs:mt-4 xs:leading-10">
          {linkText}
        </p>
      </a>
    </div>
  );
}
