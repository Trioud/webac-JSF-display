"use client";
import Cartdridges from "@/components/Cartdridges/Cartdridges";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const variants = {
  leave: {
    opacity: 0,
    height: "0",
    transition: { duration: 1.5 },
  },
};

export default function Home() {
  const searchParams = useSearchParams();
  const controls = useAnimationControls();
  const [isLoading, setIsLoading] = useState(
    searchParams.get("anim") === "1" ? false : true
  );

  const router = useRouter();
  const openGame = (url: string) => {
    router.push(url);
  };

  const [background, setBackground] = useState<string>("/nathan-bg.png");
  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 4, ease: "easeInOut" } },
    // animate: "show",
    exit: { opacity: 0 },
    key: "loader",
    onAnimationComplete: () => controls.start("leave"),
  };
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.main
          key="loader"
          initial={{
            opacity: 1,
            height: "100vh",
          }}
          variants={variants}
          animate={controls}
          onAnimationComplete={() => setIsLoading(false)}
          className="w-full h-full"
        >
          <motion.div
            {...animation}
            className="relative w-full h-full px-10 flex flex-col justify-center items-center"
          >
            <div className="w-96 h-44	relative">
              <Image
                layout="fill"
                src={"/global_assets/webac_loading.svg"}
                alt="logo"
              />
            </div>
          </motion.div>
        </motion.main>
      ) : (
        <main className="h-screen flex flex-col relative">
          {/* Header */}
          <Header />
          {/* Content */}
          <Cartdridges openGame={openGame} setBackground={setBackground} />

          <Footer />
          <motion.main
            key={background}
            className="z-[-1]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
          >
            <Image
              src={background}
              className="filter brightness-75"
              alt="background"
              priority
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </motion.main>
        </main>
      )}
    </AnimatePresence>
  );
}
