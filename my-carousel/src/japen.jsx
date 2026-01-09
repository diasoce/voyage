import React from "react";
import rectangle9 from "./rectangle-9.svg";  
import japenletter from "./japenletter.svg";
import lantern from "./Group 1.svg";
import bigcat from "./고양이 1.svg";
import cat1 from "./고앵이 1.svg";
import cat2 from "./고앵이 2.svg";
import cat3 from "./고앵이 3.svg";
import Vector from "./Vector.svg";
import Vector1 from "./Vector-1.svg";
import Vector2 from "./Vector-2.svg";
import Vector3 from "./Vector-3.svg";
import Vector4 from "./Vector-4.svg";

import "./japen.css";
export const Desktop = () => {
  return (
    <div className="desktop">
      <img className="rectangle-9" alt="Rectangle" src={rectangle9} />

      <img className="japen" alt="Japen" src={japenletter} />

      <img className="lantern" alt="Lantern" src={lantern} />

      <img className="bigcat" alt="Bigcat" src={bigcat} />

      <img className="cat1" alt="Cat1" src={cat1} />

      <img className="cat2" alt="Cat2" src={cat2} />

      <img className="vector" alt="Vector" src={vector} />
      
      <img className="cat3" alt="Cat3" src={cat3} />  

    </div>
  );
};