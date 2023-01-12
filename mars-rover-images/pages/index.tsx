import Head from "next/head";
import { Inter } from "@next/font/google";
import * as React from "react";
import {Grid, Text } from "@nextui-org/react";
import { GetServerSideProps } from "next";
const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_URL = "https://api.nasa.gov/mars-photos/api/v1";

interface HomePageProps {
  photos: {
    id: number;
    sol: number;
    camera: {
      id: number;
      name: string;
      rover_id: number;
      full_name: string;
    };
    img_src: string;
    earth_date: string;
    rover: {
      id: number;
      name: string;
      landing_date: string;
      launch_date: string;
      status: string;
    };
  }[];
}



export default function Home({ data }: HomePageProps) {
  return (
    <>
      <Head>
        <title>Mars Rover Images</title>
        <meta name="description" content="Nasa Mars Rover Images" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold">Mars Rover Images</h1>
      </main>

      <ul>
        {data.photos.map(({id, sol}) => {
          return <li key={id}>Id:{id}, Sol:{sol}</li>;
        })}
      </ul>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const category = "rovers";
  const rover = "curiosity";
  const solarDay = 1;

  const res = await fetch(
    `${NASA_API_URL}/${category}/${rover}/photos?sol=${solarDay}&api_key=${NASA_API_KEY}`
  );

  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
};
