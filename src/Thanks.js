import $style from "@src/Section.scss";
import React from "react";
export default function Thanks({ thanks }) {
  return (
    <section>
      <h2 className={$style.head}>THANKS TO</h2>
      <div>
        {thanks.map((thank, index) => (
          <span key={index} className={$style.thank}>
            {thank}
          </span>
        ))}
      </div>
    </section>
  );
}
