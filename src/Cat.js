import $style from "@src/Cat.scss";
import bat from "@src/bat.gif";
import cat from "@src/cat.jpg";
import React from "react";
export default class Cat extends React.Component {
  constructor(props) {
    super(props);
    const { onClick } = props;
    this.state = {
      mouse: {
        x: null,
        y: null
      },
      bat: false
    };
    this.onClick = onClick;
    this.refCat = React.createRef();
    this.refBat = React.createRef();
    this.catMouseenter = this.catMouseenter.bind(this);
    this.catMouseleave = this.catMouseleave.bind(this);
    this.batMove = this.batMove.bind(this);
  }
  catMouseenter() {
    this.setState({
      bat: true
    });
  }
  catMouseleave(event) {
    this.setState({
      bat: false
    });
  }
  batMove(event) {
    this.setState({
      mouse: {
        x: event.clientX,
        y: event.clientY
      }
    });
    const { current: batElement } = this.refBat;
    const offset = 8;
    batElement.style.top = `${this.state.mouse.y + offset}px`;
    batElement.style.left = `${this.state.mouse.x + offset}px`;
  }
  componentDidMount() {
    const { current: catElement } = this.refCat;
    catElement.addEventListener("mouseenter", this.catMouseenter);
    catElement.addEventListener("mouseleave", this.catMouseleave);
    catElement.addEventListener("mousemove", this.batMove);
  }
  render() {
    return (
      <figure className={$style.figure}>
        <img
          src={cat}
          ref={this.refCat}
          onClick={this.onClick}
          className={$style.cat}
        />
        {this.state.bat && (
          <img src={bat} ref={this.refBat} className={$style.bat} />
        )}
      </figure>
    );
  }
}
