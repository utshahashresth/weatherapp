"use client";
import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Page = () => {
  const boxRef = useRef(null);

  function click() {
    gsap.from(boxRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
    });
  }
  const key = process.env.NEXT_PUBLIC_WEATHER_API;
  const [city, setCity] = useState("london");
  const [data, setData] = useState<any>();
  const [system, setsystem] = useState(true);

  async function weatherapp(queryCity: string) {
    const units = system ? "imperial" : "metric";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${key}&units=${units}`
    );

    const result = await response.json();
    setData(result);
  }

  function changesystem() {
    setsystem(!system);
    weatherapp(city);
  }

  useEffect(() => {
    weatherapp(city);
  }, []);

  return (
    <div className="bg-gradient-to-r from-violet-200 to-pink-200 h-200 text-white rounded-3xl text-center p-6">
      <Input
        placeholder="Enter city"
        className="w-80 mt-10 mb-2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button
        onClick={() => weatherapp(city)}
        className="border-2 ml-2 bg-white text-black"
      >
        Search
      </Button>

      {data && (
        <>
          <p className="text-8xl mt-10" ref={boxRef}>
            {data.main?.temp}
            {system ? "°C" : "°F"}
          </p>
          <p className="text-3xl">{data.weather?.[0]?.description}</p>
          <p className="flex justify-center items-center gap-2 mt-4">
            Wind: {data.wind?.speed} m/s
          </p>
          <p>Humidity: {data.main?.humidity}%</p>
          <Button
            onClick={() => {
              click(), changesystem();
            }}
            className="w-25 h-10 bg-white rounded-lg text-black"
          >
            change
          </Button>
        </>
      )}
    </div>
  );
};

export default Page;
