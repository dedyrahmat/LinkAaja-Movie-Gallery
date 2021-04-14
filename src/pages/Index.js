import React from "react";

function Index() {
  return (
    <div className="container px-24 mx-auto">
      <section className="pt-20">
        <div className="relative">
          <input
            type="search"
            className="border focus:shadow-lg w-full rounded-full py-4 px-8 outline-none text-xl"
          />
          <span className="material-icons absolute text-2xl right-5 top-4 text-gray-800">
            search
          </span>
        </div>
      </section>
      <main className="grid grid-cols-6 gap-4 my-6">
        {[1, 2, 3, 4, 5, 6, 7].map((index) => (
          <div className="rounded-lg bg-white hover:shadow-lg border">
            <img
              className="rounded-tl-lg rounded-tr-lg object-cover"
              src="https://image.tmdb.org/t/p/original/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg"
              alt="Poster"
              style={{ width: 166, height: 249 }}
            />
            <div className="p-4">
              <p>Godzilla vs. Kong</p>
              <span>2021-03-24</span>
              <p className="items-center flex align-bottom">
                <span className="material-icons">star</span> 8.4
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Index;
