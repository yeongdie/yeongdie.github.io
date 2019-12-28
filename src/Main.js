import $style from "@src/Main.scss";
import data from "@src/_.json";
import { Helmet } from "react-helmet";
import React from "react";
import Section from "@src/Section.js";
const { title, categories, items } = data;
export default function Main() {
  const sections = categories.map(categoryTitle => (
    <Section
      key={categoryTitle}
      categoryTitle={categoryTitle}
      items={items.filter(({ category }) => category === categoryTitle)}
    />
  ));

  return (
    <main>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>yeongdie</title>
      </Helmet>
      <header className={$style.head}>
        <h1 className={$style.title}>{title}</h1>
      </header>
      {sections}
    </main>
  );
}
