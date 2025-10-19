// src/components/Intro.tsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function TextHighlight() {
  const mountainRef = useRef(null);
  const fadeRef = useRef(null);
  const typeRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      mountainRef.current,
      { backgroundPositionY: '0' },
      {
        backgroundPositionY: '-30vh',
        scrollTrigger: {
          trigger: mountainRef.current,
          start: 'top top',
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      fadeRef.current,
      {
        yPercent: 200,
        autoAlpha: 0,
      },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 2,
        delay: 3.5,
      }
    );
    gsap.fromTo(
      fadeRef.current,
      {
        autoAlpha: 1,
      },
      {
        autoAlpha: 0,
        scrollTrigger: {
          trigger: mountainRef.current,
          start: 'top top',
          end: '+300',
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      typeRef.current,
      {
        width: '0',
      },
      {
        width: '100%',
        duration: 1.5,
        ease: 'steps(16)',
      }
    );
  });
  const headline = `Grand Format is here`;
  const sub = `I'm a photographer and web developer in the Hudson Valley, NY.`;
  return (
    <div
      ref={mountainRef}
      className="bg-[url(/images/catskills.webp)] min-h-[100vh] pt-18 xs:pt-25 pl-4 pr-4 flex flex-col items-center font-sans relative bg-fixed will-change-[background-position-y] bg-size-[265%] md:bg-size-[180%] lg:bg-size-[100%]"
    >
      <div className="hidden [@media(max-height:450px)]:block">
        <p className="text-xl relative -top-4">
          OK time to be real – I do not give a shit about this viewport. Please
          turn your phone maybe?
        </p>
      </div>
      <h2 className="text-2xl xs:text-4xl font-bold whitespace-nowrap mt-4">
        <div className="relative overflow-hidden">{headline}</div>
      </h2>
      <div className="relative overflow-hidden text-center">
        <h3 className="inline-block text-md xs:text-xl md:text-2xl">{sub}</h3>
      </div>
      <div className="w-full sm:w-[92vw] lg:w-[80vw] relative mt-2 xs:mt-8 md:mt-auto mb-4 pb-8 overflow-hidden">
        <div
          ref={fadeRef}
          className="gsap-hidden text-rose-50 h-[50vh] md:h-[250px] grid"
        >
          <div className="relative grid grid-rows-2 justify-center md:grid-cols-2"></div>
        </div>
      </div>
    </div>
  );
}
