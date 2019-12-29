import $style from "@src/Main.scss";
import Cat from "@src/Cat.js";
import data from "@src/_.ts";
import React from "react";
import Section from "@src/Section.js";
import Thanks from "@src/Thanks.js";
const { title, tumblr, categories, items, thanks } = data;
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
      <main>
        {this.state.cat ? (
          <Cat onClick={this.catClick} />
        ) : (
          <>
            <header className={$style.head}>
              <h1 className={$style.title}>{title}</h1>
              <a href={tumblr} target="_blank" className={$style.tumblr}>
                {tumblr}
              </a>
            </header>
            {this.sections}
            <Thanks thanks={thanks} />
          </>
        )}
      </main>
    );
  }
}
