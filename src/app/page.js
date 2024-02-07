"use client";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl">
        <div className="bg-gradient-to-b from-red-400 to-red-900 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            <path d="M15.5 9L12 12.51 8.5 9 7 10.5l4.5 4.5 4.5-4.5L15.5 9z" />
          </svg>
        </div>
        <div className="p-12 md:p-24">
          <div className="flex justify-center text-2xl font-extrabold">
            <h3>LOVE Calculator</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
            <div className="flex items-center text-lg mb-6 md:mb-8">
              <input
                type="text"
                id="yourName"
                className="bg-gray-100 pl-6 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Your Name"
                {...register("yourName")}
              />
            </div>
            <div className="flex items-center text-lg mb-6 md:mb-8">
              {" "}
              <input
                type="text"
                id="partnerName"
                className="bg-gray-100 pl-6 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Partner Name"
                {...register("partnerName")}
              />
            </div>
            <button
              className="bg-gradient-to-b from-red-400 to-red-900 font-medium p-2 md:p-4 text-white uppercase w-full"
              type="submit"
            >
              Calculate Love
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
