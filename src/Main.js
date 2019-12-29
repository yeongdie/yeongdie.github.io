import $style from "@src/Main.scss";
import cat from "@src/cat.jpg";
import data from "@src/_.ts";
import React from "react";
import Section from "@src/Section.js";
import Thanks from "@src/Thanks.js";
const { title, categories, items, thanks } = data;
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.sections = categories.map(categoryTitle => (
      <Section
        key={categoryTitle}
        categoryTitle={categoryTitle}
        items={items.filter(({ category }) => category === categoryTitle)}
      />
    ));
    this.state = {
      cat: true
    };
    this.catClick = this.catClick.bind(this);
  }
  catClick() {
    this.setState({
      cat: false
    });
  }
  render() {
    return (
      <main className={this.state.cat ? $style.cat : ""}>
        <figure className={$style.figure}>
          <img src={cat} onClick={this.catClick} className={$style.cat} />
        </figure>
        <header className={$style.head}>
          <h1 className={$style.title}>{title}</h1>
        </header>
        {this.sections}
        <Thanks thanks={thanks} />
      </main>
    );
  }
}
