"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <section className="flex justify-between px-14 py-8 h-32 items-center backdrop-blur-lg">
      <div>
        <Image
          width={200}
          height={200}
          src={"/global_assets/webac_logo.svg"}
          alt={"webacademie logo"}
        />
      </div>
      <div className="flex justify-center gap-4">
        {time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:
        {time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}
        <Image
          width={30}
          height={30}
          src={"/global_assets/wifi.svg"}
          alt={"wifi"}
        />
        100%
        <Image
          width={30}
          height={30}
          src={"/global_assets/battery.svg"}
          alt={"battery"}
        />
      </div>
    </section>
  );
};

export default Header;
