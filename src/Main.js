import $style from "@src/Main.scss";
import Cat from "@src/Cat.js";
import { _2019, _2020 } from "@src/data.ts";
import Section from "@src/Section.js";
import Thanks from "@src/Thanks.js";
const { title, tumblr, categories, items, thanks } = _2020;
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.sections = categories.map(categoryTitle => (
      <Section
        key={categoryTitle}
        categoryTitle={categoryTitle}
        items={items
          .filter(({ category }) => category === categoryTitle)
          .sort(({ when: aWhen = "" }, { when: bWhen = "" }) =>
            bWhen.localeCompare(aWhen)
          )}
      />
    ));
    this.state = {
      cat: true
    };
    this.catClick = this.catClick.bind(this);
    this.catPopstate = this.catPopstate.bind(this);
  }
  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("cat") === "hide") {
      const url = new URL(window.location);
      url.searchParams.delete("cat");
      window.history.replaceState(this.state, "", url);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("popstate", this.catPopstate);
  }
  catClick() {
    const url = new URL(window.location);
    url.searchParams.set("cat", "hide");
    window.history.pushState(this.state, "", url);
    window.addEventListener("popstate", this.catPopstate);
    this.setState({
      cat: false
    });
  }
  catPopstate() {
    const searchParams = new URLSearchParams(window.location.search);
    this.setState({
      cat: searchParams.get("cat") !== "hide"
    });
  }
  render() {
    return (
      <main>
        {this.state.cat ? (
          <Cat catClick={this.catClick} />
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
