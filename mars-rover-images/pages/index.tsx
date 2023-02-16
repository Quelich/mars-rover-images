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
  Loading,
  Container,
  Checkbox,
} from "@nextui-org/react";

const filtersMenuItems = [
  {
    id: "rovers",
    name: "Rovers",
    options: [
      {
        id: "curiosity",
        name: "Curiosity",
        cameras: [
          { id: "FHAZ", desc: "Front Hazard Avoidance Camera" },
          { id: "RHAZ", desc: "Rear Hazard Avoidance Camera" },
          { id: "MAST", desc: "Mast Camera" },
          { id: "CHEMCAM", desc: "Front Hazard Avoidance Camera" },
          { id: "MAHLI", desc: "Mars Hand Lens Imager" },
          { id: "MARDI", desc: "Mars Descent Imager" },
          { id: "NAVCAM", desc: "Navigation Camera" },
        ],
      },
      {
        id: "opportunity",
        name: "Opportunity",
        cameras: [
          { id: "FHAZ", desc: "Front Hazard Avoidance Camera" },
          { id: "RHAZ", desc: "Rear Hazard Avoidance Camera" },
          { id: "NAVCAM", desc: "Navigation Camera" },
          { id: "PANCAM", desc: "Panoramic Camera" },
          {
            id: "MINITES",
            desc: "Miniature Thermal Emission Spectrometer (Mini-TES)",
          },
        ],
      },
      {
        id: "spirit",
        name: "Spirit",
        cameras: [
          { id: "FHAZ", desc: "Front Hazard Avoidance Camera" },
          { id: "RHAZ", desc: "Rear Hazard Avoidance Camera" },
          { id: "NAVCAM", desc: "Navigation Camera" },
          { id: "PANCAM", desc: "Panoramic Camera" },
          {
            id: "MINITES",
            desc: "Miniature Thermal Emission Spectrometer (Mini-TES)",
          },
        ],
      },
    ],
  },
];

export default function Home({ initialRoverData }) {
  const [selectedSolarDay, setSolarDay] = useState("0");
  const [solArrayLength, setSolArrayLength] = useState(0);
  const [loadedRoverData, setLoadedRoverData] = useState([initialRoverData]);
  const [isLoading, setIsLoading] = useState(false);
  const submitParams = async () => {
    const res = await fetch("/api/rover-photos", {
      method: "POST",
      body: JSON.stringify({
        sol: selectedSolarDay,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });
    const result = await res.json();
    //todo solve api limit issue
    if (result.message == "Success") {
      console.log(result);
      setSolArrayLength(result.data.photos.length);
      setIsLoading(false);
      setLoadedRoverData(result.data.photos);
    } else if (result.message == "API limit reached") {
      console.log("API limit reached");
    } else if (result.message == "Error") {
      console.log("Error");
    }
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
          <Dropdown isBordered>
            <Navbar.Item
              css={{
                "@xsMax": {
                  w: "100%",
                  jc: "center",
                },
              }}
            >
              <Dropdown.Button
                auto
                light
                css={{
                  px: 0,
                  dflex: "center",
                  svg: { pe: "none" },
                }}
                ripple={false}
              >
                Filters
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu>
              {filtersMenuItems[0].options.map((item) => (
                <Dropdown.Item key={item.id}>{item.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
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
                setIsLoading(true);
              }}
            >
              {isLoading ? (
                <Loading color="currentColor" size="sm" />
              ) : (
                "Search"
              )}
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>

      <Grid.Container gap={2} justify="center">
        {solArrayLength == 0 ? (
          <div>
            <Container>
              <Text h3>Whoops, could not found any Mars Rover photos</Text>
              <Text h4>Enter a solar day to search for solar days</Text>
            </Container>
          </div>
        ) : (
          loadedRoverData.map((photo) => {
            return (
              <Grid key={photo.id} xs={12} sm={4}>
                <Card
                  isPressable
                  onPress={(e) => {
                    console.log();
                  }}
                >
                  <Card.Header
                    css={{ position: "absolute", zIndex: 1, top: 5 }}
                  >
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
          })
        )}
      </Grid.Container>
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  const NASA_API_KEY = process.env.NASA_API_KEY;
  const NASA_API_URL = "https://api.nasa.gov/mars-photos/api/v1";
  const rover = "curiosity";
  const sol = "0";
  const loadedData = await fetch(
    `${NASA_API_URL}/rovers/${rover}/photos?sol=${sol}&api_key=${NASA_API_KEY}`
  );
  const initialRoverData = await loadedData.json();
  return {
    initialRoverData: initialRoverData.photos,
  };
};
