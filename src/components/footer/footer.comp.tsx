const Footer = () => (
  <div className='mt-7 text-center'>
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
  </div>
);

export default Footer;
