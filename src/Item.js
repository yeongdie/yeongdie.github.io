import $style from "@src/Item.scss";
import React from "react";
export default function Item({ item }) {
  const { title } = item;
  const date = item.when
    ? (() => {
        const parsed = new Date(item.when);
        const m = parsed.getMonth() + 1;
        const d = parsed.getDate();
        return `${m < 10 ? `0${m}` : m}.${d < 10 ? `0${d}` : d}`;
      })()
    : "";
  const location = item.where ? `@${item.where}` : "";
  const collaborator = item.with ? `/w ${item.with}` : "";
  return (
    <li>
      <span className={$style.word} style={{ display: date ? "" : "none" }}>
        {date}
      </span>
      <span className={$style.word}>{title}</span>
      <span className={$style.word} style={{ display: location ? "" : "none" }}>
        {location}
      </span>
      <span
        className={$style.word}
        style={{ display: collaborator ? "" : "none" }}
      >
        {collaborator}
      </span>
    </li>
  );
}
