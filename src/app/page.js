"use client";
import { useForm } from "react-hook-form";
import {
  CalculateLoveUtil,
  getLoveCalculatorResult,
} from "./util/calculateLove.util";
import { useEffect, useState } from "react";
import mixpanel from "mixpanel-browser";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  useEffect(() => {
    mixpanel.init("7cb7265e653fc1acf95a728761fc8622", {
      debug: true,
      ignore_dnt: true,
      track_pageview: true,
      persistence: "localStorage",
    });

    const userInfo = Cookies.get("loveCalUserId");
    if (userInfo) {
      mixpanel.identify(userInfo);
    } else {
      const uuid = uuidv4();
      Cookies.set("loveCalUserId", uuid);
      mixpanel.identify(uuid);
    }
  }, []);

  const { register, handleSubmit, reset } = useForm();

  const [answer, setAnswer] = useState("");

  const onSubmit = (data) => {
    if (!data.yourName || !data.partnerName) {
      setAnswer(
        "Please Enter your Name and your's Partner Name to get the result"
      );
      return;
    }
    try {
      mixpanel.track("Searched Performed", {
        yourName: data.yourName,
        partnerName: data.partnerName,
      });
    } catch (e) {
      console.log(e);
    }
    const result = CalculateLoveUtil(data.yourName, data.partnerName);
    try {
      mixpanel.track("Searched Metrics", {
        flamesName: result.category,
        compatibilityScore: result.compatibility,
        loveScore: result.love,
      });
    } catch (e) {
      console.log(e);
    }
    const messageResult = getLoveCalculatorResult(result);
    try {
      mixpanel.track("Result", {
        message: messageResult,
      });
    } catch (e) {
      console.log(e);
    }
    setAnswer(messageResult);

    reset();
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
        {!answer && (
          <div className="px-6 py-16 md:p-24">
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
                className="bg-gradient-to-b from-red-400 to-red-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded-md"
                type="submit"
              >
                Calculate Love
              </button>
            </form>
          </div>
        )}
        {answer && (
          <div className="px-6 py-16 md:p-24">
            <div className="flex justify-center text-2xl font-extrabold">
              <h3 className="text-xl sm:text-3xl">LOVE Calculator Result</h3>
            </div>
            <div className="py-8 sm:py-12 font-sans text-xl sm:text-3xl text-fuchsia-700 font-bold">
              {answer}
            </div>
            <button
              className="text-xs sm:text-xl bg-gradient-to-b from-gray-400 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded-md"
              type="submit"
              onClick={() => {
                reset();
                mixpanel.track("Back To Love Calculator", {});
                setAnswer("");
              }}
            >
              Return to Love Calculator
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
