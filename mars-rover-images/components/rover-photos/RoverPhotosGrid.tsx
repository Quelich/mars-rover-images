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

function RoverPhotosGrid({solArrayLength, loadedRoverData}: any) {
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

export default RoverPhotosGrid;
