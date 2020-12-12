import $style from "@src/Main.scss";
import Cat from "@src/Cat.js";
import { _2019, _2020 } from "@src/data.ts";
import Section from "@src/Section.js";
import Thanks from "@src/Thanks.js";

const { useEffect, useState } = React;

export default function Main() {
  const [cat, setCat] = useState(true);
  const [year, setYear] = useState(2020);

  const catClick = () => {
    const url = new URL(window.location);
    const { searchParams } = url;
    searchParams.set("cat", "hide");
    window.history.pushState(Object.fromEntries(searchParams), "", url);
    setCat(false);
  };

  const yearChange = ({ target }) => {
    const url = new URL(window.location);
    const { searchParams } = url;
    const value = Number(target.value);
    value !== 2020
      ? searchParams.set("year", value)
      : searchParams.delete("year");
    window.history.pushState(Object.fromEntries(searchParams), "", url);
    setYear(value);
  };

  const sortItem = ({ when: aWhen = "" }, { when: bWhen = "" }) =>
    bWhen.localeCompare(aWhen);

  const handlePopstate = () => {
    const { cat: catQuery, year: yearQuery } = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );
    setCat(catQuery !== "hide");
    setYear(Number(yearQuery) || 2020);
  };

  useEffect(function globalEffect() {
    const url = new URL(window.location);
    const { searchParams } = url;
    const { cat: catQuery, year: yearQuery } = Object.fromEntries(searchParams);
    catQuery === "hide" && searchParams.delete("cat");
    yearQuery && searchParams.delete("year");
    window.history.replaceState(Object.fromEntries(searchParams), "", url);
    window.addEventListener("popstate", handlePopstate);
  }, []);

  useEffect(
    function catEffect() {
      document.activeElement.blur();
    },
    [year]
  );

  const { tumblr, categories, items, thanks } = (() => {
    switch (year) {
      case 2020:
        return _2020;
      case 2019:
        return _2019;
    }
  })();

  const Header = () => (
    <header className={$style.head}>
      <h1 className={$style.title}>
        <a href={window.location.pathname} className={$style.anchor}>
          died
        </a>
      </h1>
      <select value={year} onChange={yearChange}>
        <option>2020</option>
        <option>2019</option>
      </select>
      <br />
      <a href={tumblr} target="_blank" className={$style.tumblr}>
        {tumblr}
      </a>
    </header>
  );

  const Sections = () =>
    categories.map(categoryTitle => (
      <Section
        key={categoryTitle}
        categoryTitle={categoryTitle}
        items={items
          .filter(({ category }) => category === categoryTitle)
          .sort(sortItem)}
      />
    ));

  return (
    <main>
      {cat ? (
        <Cat catClick={catClick} />
      ) : (
        <>
          <Header />
          <Sections />
          <Thanks thanks={thanks} />
        </>
      )}
    </main>
  );
}
