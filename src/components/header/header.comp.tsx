'use client';

import Image from 'next/image';
import Link from 'next/link';

import githubIcon from '@/assets/images/github.svg';
import icon from '@/assets/images/icon.png';

const Header = () => (
  <header className='py-5 w-full bg-slate-100'>
    <div className='container'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-4 items-center'>
          <Link href='/' className='flex gap-3 items-center'>
            <Image src={icon} width={17} height={17} alt='placeholder maker home' />
            <h1 className='font-semibold'>
              <span className='text-xl text-emerald-500'>P</span>
              <span className='text-lg'>laceholder</span>
              <span className='px-1' />
              <span className='text-xl text-emerald-500'>M</span>
              <span className='text-lg'>aker</span>
            </h1>
          </Link>
        </div>
        <a href='https://github.com/asif-jalil/scroll-carousel' target='_blank' rel='noreferrer'>
          <Image src={githubIcon as string} width={22} height={22} alt='placeholder maker github' />
        </a>
      </div>
    </div>
  </header>
);

export default Header;
