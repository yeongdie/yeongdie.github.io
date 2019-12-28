import $style from "@src/Item.scss";
import moment from "moment";
import React from "react";
export default function Item({ item }) {
  const { title } = item;
  const date = item.when ? moment(item.when).format("MM.DD") : "";
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
