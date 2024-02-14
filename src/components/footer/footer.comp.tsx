import Link from 'next/link';

const Footer = () => (
  <div className='mt-7 text-center flex justify-center items-center gap-3'>
    <p className='text-slate-400'>
      © {new Date().getFullYear()} All Right Reserved By{' '}
      <a
        href='https://www.linkedin.com/in/asifjalil0/'
        target='_blank'
        rel='noreferrer'
        className='text-emerald-500 hover:text-emerald-400'
      >
        Asif Jalil
      </a>
    </p>
    <span>|</span>
    <Link href='/placeholder-url' className='text-emerald-500'>
      Placeholder URL generator
    </Link>
  </div>
);

export default Footer;
