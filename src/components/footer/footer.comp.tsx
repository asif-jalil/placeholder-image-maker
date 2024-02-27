import Link from 'next/link';

const Footer = () => (
  <div className='mt-10 text-center flex justify-center items-center gap-3'>
    <p className='text-slate-400'>
      © {new Date().getFullYear()} All Right Reserved By{' '}
      <a
        href='https://www.linkedin.com/in/asifjalil0/'
        target='_blank'
        rel='noreferrer'
        className='text-dark font-medium hover:underline'
      >
        Asif Jalil
      </a>
    </p>
    <span>|</span>
    <Link href='/placeholder-url' className='text-dark font-medium'>
      Placeholder URL generator
    </Link>
  </div>
);

export default Footer;
