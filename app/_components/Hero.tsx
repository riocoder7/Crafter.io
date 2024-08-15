import React from 'react'

function Hero() {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold text-gray-300 sm:text-5xl">
            Documents & diagrams 
            <strong className="font-extrabold text-amber-700 sm:block"> for engineering teams </strong>
          </h1>

          <p className="mt-4 text-gray-400 sm:text-xl/relaxed">
            All-in-one markdown editor, collaborative canvas, and diagram-as-code builder
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-amber-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-amber-700 focus:outline-none focus:ring active:bg-amber-500 sm:w-auto"
              href="#"
            >
              Get Started
            </a>
            
            <a
  className="relative block w-full rounded px-12 py-3 text-sm font-medium text-Black shadow 
             bg-gradient-to-r from-yellow-400 via-gray-300 to-gray-500 
             hover:bg-gradient-to-l transition duration-300 focus:outline-none focus:ring-2 
             focus:ring-offset-2 focus:ring-yellow-500 sm:w-auto star_twinkling"
  href="#"
>
  Crafter AI
</a>



            

          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
