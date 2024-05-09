// import { useEffect, useState } from "react";
// import Scrollbar from "smooth-scrollbar";
// import OversrollPlugin from "smooth-scrollbar/plugin/overscroll"


// var overscrollOptions ={
//     enable : true,
//     effect : "bounce",
//     damping : 0.15,
//     maxOverscroll : 150
// }

// var options={
//     damping : 0.05,
//     plugins:{
//         overscroll: {...overscrollOptions}
//     }

// }
// const Scroll = () => {
//   useEffect(() => {
//     Scrollbar.use(OverscrollPlugin);
//     Scrollbar.init(document.body, options);
//     return () => {
//         if(Scrollbar) Scrollbar.destroy(document.body);
//     }
//   }, []);

//   return null;
// };

// export default Scroll;

import { useEffect } from "react";
import Scrollbar from "smooth-scrollbar";
import OverscrollPlugin from "smooth-scrollbar/dist/plugins/overscroll";

var overscrollOptions = {
  enable: true,
  effect: "bounce",
  damping: 0.15,
  maxOverscroll: 250
};

var options = {
  damping: 0.05,
  plugins: {
    overscroll: { ...overscrollOptions }
  }
};

const Scroll = () => {
  useEffect(() => {
    Scrollbar.use(OverscrollPlugin);
    Scrollbar.init(document.body, options);
    return () => {
      if (Scrollbar) Scrollbar.destroy(document.body);
    };
  }, []);

  return null;
};

export default Scroll;
