"use client";
import { StudentGameInfo, students } from "@/data/students";
import { useHotkeys } from "@mantine/hooks";
import { motion } from "framer-motion";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

const Item: React.FC<{ item: StudentGameInfo; current?: boolean }> = ({
  item,
  current,
}) => {
  const itemStyle = "keen-slider__slide rounded-md shadow-xl bg-white";
  const params = current ? 300 : 200;
  return (
    <div
      className={itemStyle}
      style={{
        minWidth: params,
        maxWidth: params,
        height: params,
        minHeight: 0, //minHeight 0 to override minHeight 100% from keen-slider
      }}
    >
      <Image src={item.icon} alt="icon" priority fill />
    </div>
  );
};

const AdaptiveHeight = (slider) => {
  function updateHeight() {
    slider.container.style.height =
      slider.slides[slider.track.details.rel].offsetHeight + "px";
  }
  slider.on("created", updateHeight);
  slider.on("slideChanged", updateHeight);
};

const Cartdridges: React.FC<{
  openGame: (url: string) => void;
  setBackground: Dispatch<SetStateAction<string>>;
  disable?: boolean;
}> = ({ openGame, setBackground, disable = false }) => {
  const pathName = usePathname();
  const [indexCollection, setIndexCollection] = useState(0);
  useHotkeys([
    ["ArrowRight", () => onKeyPress(1)],
    ["ArrowLeft", () => onKeyPress(-1)],
    ["Enter", () => openGame(students[indexCollection].gamePath)],
  ]);
  const [sliderRef, slider] = useKeenSlider(
    {
      mode: "snap",
      rtl: false,
      slides: { perView: "auto", spacing: 20, origin: "auto" },
    },
    [AdaptiveHeight]
  );

  const CartdridgesCollection = students.map(
    (item: StudentGameInfo, index: number) => {
      if (pathName === `/` && item.gamePath === "/") return;
      return (
        <Item key={index} item={item} current={indexCollection == index} />
      );
    }
  );

  const onKeyPress = (move: 1 | -1) => {
    const newIndex = indexCollection + move;
    if (newIndex >= 0 && newIndex < students.length) {
      setBackground(students[newIndex].background);
      setIndexCollection(indexCollection + move);
      slider.current?.moveToIdx(newIndex);
    }
  };

  const Title = () => {
    return (
      <motion.section
        key={"title"}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.1 } }}
        className="text-4xl font-bold flex gap-2 items-center"
      >
        <h1 className="py-2">{students[indexCollection].student}</h1>
        <Image
          src={"/global_assets/linkedin.svg"}
          width={30}
          height={30}
          alt="linkedin"
        />
      </motion.section>
    );
  };
  return (
    <div className={"pl-24 py-3.5 flex-1"}>
      <motion.section
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        ref={sliderRef}
        className="keen-slider h-52"
      >
        {CartdridgesCollection}
      </motion.section>
      <Title />
    </div>
  );
};

export default Cartdridges;
