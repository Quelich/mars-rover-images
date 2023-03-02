import { Text } from "@nextui-org/react";

export default function About() {
  return (
    <>
      <div className="">
        <Text h1>About</Text>
        <Text className="flex items-center justify-center h-screen">
          This is a simple app that uses the Nasa Mars Rover Photos API to
          display photos from the Curiosity, Opportunity, and Spirit rovers.
        </Text>
      </div>
    </>
  );
}
