/* Used in <Auth/> and <Monsters/> during calls to database. */

import React from "react";

import style from "./Spinner.css";

const spinner = () => (
    <div className={style.loader}>Loading...</div>
);

export default spinner;