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

export default filtersMenuItems;
