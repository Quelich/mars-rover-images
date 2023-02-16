import React, { useState } from "react";
import {
  Grid,
  Text,
  Card,
  Col,
  Container,
  Button,
  Popover,
  Row,
} from "@nextui-org/react";

function RoverPhotosGrid({ solArrayLength, loadedRoverData }: any) {
  return (
    <>
      <Grid.Container gap={2} justify="center">
        {solArrayLength == 0 ? (
          <div>
            <Container>
              <Text h3>Whoops, could not found any Mars Rover photos</Text>
              <Text h4>Enter a solar day to search for solar days</Text>
            </Container>
          </div>
        ) : (
          loadedRoverData.map((photo: any) => {
            return (
              <Grid key={photo.id} md={3} xs={6} sm={4}>
                <Card isPressable isHoverable>
                  <Card.Header
                    css={{ position: "absolute", zIndex: 1, top: 5 }}
                  ></Card.Header>
                  <Card.Image
                    src={photo.img_src}
                    objectFit="cover"
                    width="100%"
                    height={400}
                    alt="rover image"
                  />
                  <Card.Footer
                    isBlurred
                    css={{
                      position: "absolute",
                      bgBlur: "primarySolidContrast",
                      borderTop:
                        "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                      bottom: 0,
                      zIndex: 1,
                    }}
                  >
                    <Row>
                      <Col>
                        <Row>
                          <Text b color="secondary" size={14}>
                            Rover:
                          </Text>
                          <Text b color="" size={14}>
                            {photo.rover.name}
                          </Text>
                        </Row>

                        <Row>
                          <Text b color="secondary" size={14}>
                            Earth Date:
                          </Text>
                          <Text b color="" size={14}>
                            {photo.earth_date}
                          </Text>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid.Container>
    </>
  );
}

export default RoverPhotosGrid;
