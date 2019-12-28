import $style from "@src/Section.scss";
import React from "react";
import Item from "@src/Item.js";
export default function Section({ categoryTitle, items }) {
  return (
    <section>
      <h2 className={$style.head}>{categoryTitle}</h2>
      <ul className={$style.list}>
        {items.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </ul>
    </section>
  );
}
