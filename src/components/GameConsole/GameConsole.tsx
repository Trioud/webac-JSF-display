"use client";
import { useHotkeys } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Script from "next/script";
import { useEffect, useState } from "react";
import Cartdridges from "../Cartdridges/Cartdridges";

const GameConsole: React.FC<{ cartdridge: string }> = ({ cartdridge }) => {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [background, setBackground] = useState<string>("/nathan-bg.png");
  const openGame = (url: string) => {
    // router not working with Phaser
    if (url === "/") location.href = "/?anim=1";
    else location.href = url;
  };

  useEffect(() => {
    setLoading(true);
  }, []);
  useHotkeys([["H", () => setDisplay(!display)]]);
  return (
    <AnimatePresence>
      {display && (
        <motion.div
          key={"modal"}
          initial={{ height: 0 }}
          animate={{ height: 400, transition: { duration: 0.1 } }}
          exit={{ height: 0 }}
          className="absolute bottom-0 bg-primary-blue	w-screen rounded-md"
        >
          <Cartdridges openGame={openGame} setBackground={setBackground} />
        </motion.div>
      )}
      <div>
        <Script src="https://cdn.jsdelivr.net/npm/phaser@3.80.0/dist/phaser.min.js"></Script>
        <Script type="module" src={cartdridge}></Script>
        <div key={Math.random()} id="game"></div>
      </div>
    </AnimatePresence>
  );
};

export default GameConsole;
