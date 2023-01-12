import Head from "next/head";
import { Inter } from "@next/font/google";
import * as React from "react";
import { Grid, Text, Card, Col } from "@nextui-org/react";
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

      <Grid.Container gap={2} justify="center">
        {data.photos.map(({ id, sol, img_src, camera, rover}) => {
          return (
            <Grid key={id} xs={16} sm={4}>
              <Card>
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                  <Col>
                    <Text
                      size={12}
                      weight="bold"
                      transform="uppercase"
                      color="#ffffffAA"
                    >
                      {rover.name}
                    </Text>
                    <Text h4 color="white">
                      Photo Id: {id}
                    </Text>
                  </Col>
                </Card.Header>
                <Card.Image
                  src={img_src}
                  objectFit="cover"
                  width="100%"
                  height={340}
                  alt="Card image background"
                />
              </Card>
            </Grid>
          );
        })}
      </Grid.Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const category = "rovers";
  const rover = "curiosity";
  const solarDay = 1000;

  const res = await fetch(
    `${NASA_API_URL}/${category}/${rover}/photos?sol=${solarDay}&api_key=${NASA_API_KEY}`
  );

  const data = await res.json();
  console.log(data);

  return {
    props: { data }, // will be passed to the page component as props
  };
};
