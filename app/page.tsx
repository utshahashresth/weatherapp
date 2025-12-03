"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Page = () => {
  const key = process.env.NEXT_PUBLIC_WEATHER_API;

  const boxRef = useRef(null);

  const [city, setCity] = useState("london");
  const [data, setData] = useState<any>();
  const [system, setSystem] = useState(true);
  const [hourlyData, setHourlyData] = useState<any[]>([]);

  function animateTemp() {
    gsap.from(boxRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power2.out",
    });
  }

  async function weatherapp(queryCity: string) {
    const units = system ? "metric" : "imperial";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${key}&units=${units}`
    );
    const result = await response.json();
    setData(result);
    animateTemp();

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${queryCity}&appid=${key}&units=${units}`
    );
    const forecastData = await forecastRes.json();

    const nextHours = forecastData.list.slice(0, 8).map((item: any) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
      }),
      temp: Math.round(item.main.temp),
    }));

    setHourlyData(nextHours);
  }

  function toggleSystem() {
    setSystem(!system);
    weatherapp(city);
  }

  useEffect(() => {
    weatherapp(city);
  }, []);

  return (
    <div className="bg-black h-auto text-white rounded-3xl p-6">
      <div className="text-center">
        <Input
          placeholder="Enter city"
          className="w-80 mt-6 mb-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          onClick={() => weatherapp(city)}
          className="border-2 ml-2 bg-white text-black hover:bg-gray-100"
        >
          Search
        </Button>
      </div>

      {data && (
        <div className="text-center">
          <p className="text-8xl mt-10 font-semibold" ref={boxRef}>
            {data.main?.temp}
            {system ? "°C" : "°F"}
          </p>

          <p className="text-4xl flex items-center gap-4 justify-center">
            {data.weather?.[0]?.description}

            <Button
              onClick={toggleSystem}
              className="w-25 h-10 bg-white rounded-lg text-black hover:bg-gray-100 mt-3"
            >
              change
            </Button>
          </p>

          <div className="flex w-60 mt-10 justify-center ml-120 ">
            <div className="flex-grow">
              <p>Wind</p>
              <p className="text-3xl">{data.wind?.speed} m/s</p>
            </div>

            <div>
              <p>Humidity</p>
              <p className="text-3xl">{data.main?.humidity}%</p>
            </div>
          </div>

          {hourlyData.length > 0 && (
            <div className=" p-6 rounded-2xl mt-10">
              <h2 className="text-white text-xl font-semibold mb-4">
                Hourly Forecast
              </h2>

              <LineChart width={1200} height={220} data={hourlyData}>
                <CartesianGrid
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />

                <XAxis
                  dataKey="time"
                  stroke="#aaa"
                  tick={{ fill: "#888", fontSize: 12 }}
                />

                <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />

                <Tooltip
                  contentStyle={{
                    background: "#111",
                    border: "1px solid #333",
                    color: "#fff",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#ffffff66"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: "#ff9900",
                    stroke: "#ff9900",
                  }}
                />
              </LineChart>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
