export const Hero = () => {
  return (
    <section>
      <div className="h-[36em] object-cover w-full bg-cover bg-center flex items-end p-8 bg-[url(/hero/people1.jpeg)] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-60% opacity-75"></div>
        <div className="z-10 text-white max-w-[50%]">
          <h1 className="display-1">Odvaha</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
