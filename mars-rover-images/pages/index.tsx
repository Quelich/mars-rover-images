import Head from "next/head";
import * as React from "react";
import {
  Grid,
  Text,
  Card,
  Col,
  Navbar,
  createTheme,
  NextUIProvider,
  Input,
  Dropdown,
  Avatar,
} from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { SearchIcon } from "../components/SearchIcon";

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_URL = "https://api.nasa.gov/mars-photos/api/v1";
let solarDay: number = 0;

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
        <title>Mars Rover Photos</title>
        <meta name="description" content="Nasa Mars Rover Photos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isBordered variant="floating">
        <Navbar.Brand css={{ mr: "$4" }}>
          <Text b color="inherit" css={{ mr: "$11" }} hideIn="xs">
            Mars Rover Photos
          </Text>
          <Navbar.Content
            hideIn="xs"
            variant="highlight"
            activeColor={"primary"}
          >
            <Navbar.Link isActive href="/">
              Home
            </Navbar.Link>
            <Navbar.Link href="/about">About</Navbar.Link>
          </Navbar.Content>
        </Navbar.Brand>
        <Navbar.Content
          css={{
            "@xsMax": {
              w: "100%",
              jc: "space-between",
            },
          }}
        >
          <Navbar.Item
            css={{
              "@xsMax": {
                w: "100%",
                jc: "center",
              },
            }}
          >
            <Input
              clearable
              contentLeft={
                <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
              }
              contentLeftStyling={false}
              css={{
                w: "100%",
                "@xsMax": {
                  mw: "300px",
                },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              placeholder="Search..."
            />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>

      <Grid.Container gap={2} justify="center">
        {data.photos.map(({ id, sol, img_src, camera, rover, earth_date }) => {
          return (
            <Grid key={id} xs={12} sm={4}>
              <Card>
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                  <Col>
                    <Text
                      size={16}
                      weight="bold"
                      transform="uppercase"
                      color="#ffffffAA"
                    >
                      {rover.name}
                    </Text>
                    <Text h4 color="white">
                      Date: {earth_date}
                    </Text>
                  </Col>
                </Card.Header>
                <Card.Image
                  src={img_src}
                  objectFit="cover"
                  width="100%"
                  height={400}
                  alt="rover image"
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
  const solarDay = 0;

  const res = await fetch(
    `${NASA_API_URL}/${category}/${rover}/photos?sol=${solarDay}&api_key=${NASA_API_KEY}`
  , );

  const data = await res.json();
  //console.log(data);

  return {
    props: { data }, // will be passed to the page component as props
  };
};
