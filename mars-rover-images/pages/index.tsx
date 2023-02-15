import Head from "next/head";
import React, { useState } from "react";
import {
  Grid,
  Text,
  Card,
  Col,
  Navbar,
  Input,
  Dropdown,
  Button,
} from "@nextui-org/react";
import { GetServerSideProps } from "next";

export default function Home() {
  const [selectedSolarDay, setSolarDay] = useState("0");
  const [loadedRoverData, setLoadedRoverData] = useState([]);

 
  const submitParams = async () => {
    const res = await fetch("/api/rover-photos", {
      method: "POST",
      body: JSON.stringify({
        sol: selectedSolarDay,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    //console.log(result.data.photos);
    setLoadedRoverData(result.data.photos);
  };

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
          <Text h3 b color="inherit" css={{ mr: "$14" }} hideIn="xs">
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
              size="md"
              labelPlaceholder="Solar Day" //todo limit max solar day
              type="number"
              onChange={async (e) => {
                var inputSolarDay = e.target.value;
                setSolarDay(inputSolarDay);
              }}
            ></Input>
          </Navbar.Item>
          <Navbar.Item
            css={{
              "@xsMax": {
                w: "100%",
                jc: "center",
              },
            }}
          >
            <Button
              type="submit"
              auto
              size="md"
              onPress={(e) => {
                submitParams();
              }}
            >
              Search
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>

      <Grid.Container gap={2} justify="center">
        {loadedRoverData.map((photo) => {
          return (
            <Grid key={photo.id} xs={12} sm={4}>
              <Card isPressable>
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                  <Col>
                    <Text
                      size={16}
                      weight="bold"
                      transform="uppercase"
                      color="#ffffffAA"
                    >
                      {photo.rover.name}
                    </Text>
                    <Text h4 color="white">
                      Date: {photo.earth_date}
                    </Text>
                  </Col>
                </Card.Header>
                <Card.Image
                  src={photo.img_src}
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

// export const getServerSideProps: GetServerSideProps = async () => {
//   const NASA_API_KEY = process.env.NASA_API_KEY;
//   const NASA_API_URL = "https://api.nasa.gov/mars-photos/api/v1";
//   const rover = "curiosity";
//   const solarDay = 1000;

//   const res = await fetch(
//     `${NASA_API_URL}/rovers/${rover}/photos?sol=${solarDay}&api_key=${NASA_API_KEY}`
//   );

//   const data = await res.json();

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// };
