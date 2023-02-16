import React, { useState } from "react";
import filtersMenuItems from "../data/filters";
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
import RoverPhotosGrid from "../components/rover-photos/RoverPhotosGrid";

export default function Home({ initialRoverData }: any) {
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
            <Navbar.Link href="/">Home</Navbar.Link>
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
              color={"primary"}
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

      <RoverPhotosGrid
        solArrayLength={solArrayLength}
        loadedRoverData={loadedRoverData}
      />
    </>
  );
}

Home.getInitialProps = async (ctx: any) => {
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
