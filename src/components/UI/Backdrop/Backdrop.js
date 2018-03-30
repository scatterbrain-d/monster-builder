/* Backdrop used in <PowerModal/> to keep <Builder/> UI separate
   from the superimposed modal window */

import React from "react";

import style from "./Backdrop.css";

const backdrop = (props) => (
    props.show ? <div className={style.backdrop}
                      onClick={props.clicked}
                 ></div> : null
);

export default backdrop;