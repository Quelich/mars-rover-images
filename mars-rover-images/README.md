# mars-rover-images
This is a simple API that returns images from NASA's Mars Rover.

# Usage

Run the following command to start the server:

    npm run dev

started server on:

     http://localhost:3000
# Definitions
- FHAZ = Front Hazard Avoidance Camera
- RHAZ = Rear Hazard Avoidance Camera	
- MAST = Mast Camera
- CHEMCAM = Chemistry and Camera Complex	
- MAHLI = Mars Hand Lens Imager
- MARDI = Mars Descent Imager
- NAVCAM = Navigation Camera
- PANCAM = Panoramic Camera
- MINITES = Miniature Thermal Emission Spectrometer (Mini-TES)
# Rover Cameras
## Curiosity
- `Properties`: FHAZ, RHAZ, MAST, CHEMCAM, MAHLI, MARDI, NAVCAM
## Opportunity
- `Properties`: FHAZ, RHAZ, NAVCAM, PANCAM, MINITES
## Spirit
- `Properties`: FHAZ, RHAZ, NAVCAM, PANCAM, MINITES
# API
## Request Parameters
- sol: `int` = Solar Day (ranges from 0 to max found in endpoint)
- camera: `string`
- page: `int` = 25 items per page returned
- api_key: `string`

## Response Parameters
- name = name of the rover
- landing_date = The Rover's landing date on Mars
- launch_date = The Rover's launch date from Earth
- status = The Rover's mission status
- max_sol = The most recent Martian sol from which photos exist
- max_date = The most recent Earth date from which photos exist
- total_photos = Number of photos taken by that Rover
## Example Queries
https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY

https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=DEMO_KEY

https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=DEMO_KEY

# Future Plans
- search by solar day
- pagification
- more optimization with cache
