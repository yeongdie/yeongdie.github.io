import $style from "@src/Thanks.scss";
import React from "react";
export default function Thanks({ thanks }) {
  return (
    <section>
      <h2 className={$style.head}>THANKS TO</h2>
      <ul className={$style.list}>
        {thanks.map((thank, index) => (
          <li key={index} className={$style.thank}>
            {thank}
          </li>
        ))}
      </ul>
    </section>
  );
}
