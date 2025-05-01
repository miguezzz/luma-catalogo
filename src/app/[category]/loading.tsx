// components/Loader.tsx
import React from 'react';

export default function Loader() {
  return (
    <span
      className={`
        block
        w-[100px] h-[100px]
        bg-[linear-gradient(165deg,rgba(255,255,255,1)_0%,rgb(220,220,220)_40%,rgb(170,170,170)_98%,rgb(10,10,10)_100%)]
        rounded-full
        relative

        before:content-['']
        before:absolute
        before:inset-0
        before:rounded-full
        before:border-b-0
        before:shadow-[0_-10px_20px_20px_#ffffff40_inset,0_-5px_15px_10px_#ffffff50_inset,0_-2px_5px_#ffffff80_inset,0_-3px_2px_#ffffffbb_inset,0_2px_0px_#ffffff,0_2px_3px_#ffffff,0_5px_5px_#ffffff90,0_10px_15px_#ffffff60,0_10px_20px_20px_#ffffff40]
        before:filter before:blur-[3px]
        before:animate-spin before:duration-[2000ms] before:linear
      `}
    />
  );
}
