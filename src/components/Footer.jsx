
function Footer() {
  return (
    <div className="w-full flex flex-col items-center gap-3 py-6 text-gray-500 text-sm">
      <div className="flex items-center gap-4">

        <a
          href="https://github.com/atish-code"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/atish-shaw-241976289/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          LinkedIn
        </a>

      </div>

      <p>Built with React & Tailwind CSS</p>
    </div>
  );
}

export default Footer;