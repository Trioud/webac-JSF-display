type StudentGameInfo = {
  student: string;
  playing: boolean;
  background: string;
  icon: string;
  gamePath: string;
};

const students: StudentGameInfo[] = [
  {
    student: "Nathan Matounga",
    gamePath: "/nathan",
    playing: true,
    background: "/global_assets/nathan-bg.png",
    icon: "/global_assets/nathan-icon.png",
  },
  {
    student: "Romain Farinacci",
    gamePath: "/romain",
    playing: false,
    background: "/global_assets/romain-bg.png",
    icon: "/global_assets/romain-icon.png",
  },
  {
    student: "Tanguy Gibrat",
    gamePath: "/tanguy",
    playing: false,
    background: "/global_assets/tanguy-bg.png",
    icon: "/global_assets/tanguy-icon.png",
  },
  {
    student: "Dylan Bouraoui",
    gamePath: "/dylan",
    playing: false,
    background: "/global_assets/dylan-bg.png",
    icon: "/global_assets/dylan-icon.png",
  },
  {
    student: "Wendy Asmatico",
    gamePath: "/wendy",
    playing: false,
    background: "/global_assets/wendy-bg.png",
    icon: "/global_assets/wendy-icon.png",
  },
  {
    student: "Home",
    gamePath: "/",
    playing: false,
    background: "/global_assets/home-bg.png",
    icon: "/global_assets/home-icon.svg",
  },
];

export { students };
export type { StudentGameInfo };
