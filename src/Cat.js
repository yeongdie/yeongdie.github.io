import $style from "@src/Cat.scss";
import bat from "@src/bat.gif";
import cat from "@src/cat.jpg";
export default class Cat extends React.Component {
  constructor(props) {
    super(props);
    const { catClick } = props;
    this.state = {
      catClientRect: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      bat: false,
      resizing: false
    };
    this.catClick = catClick;
    this.refCat = React.createRef();
    this.refBat = React.createRef();
    this.figureClick = this.figureClick.bind(this);
    this.windowResize = this.windowResize.bind(this);
    this.windowMousemove = this.windowMousemove.bind(this);
  }
  figureClick() {
    if (this.state.bat) {
      this.catClick();
    }
  }
  windowMousemove(event) {
    const { clientX: x, clientY: y } = event;
    const { top, right, bottom, left } = this.state.catClientRect;
    const bat = y > top && x < right && y < bottom && x > left;
    this.setState({ bat }, () => {
      const { current: batElement } = this.refBat;
      if (batElement) {
        const offset = 24;
        batElement.style.top = `${y - offset}px`;
        batElement.style.left = `${x - offset}px`;
      }
    });
  }
  windowResize() {
    const { current: catElement } = this.refCat;
    this.setState(({ resizing }) => {
      if (!resizing) {
        window.setTimeout(() => void this.setState({ resizing: false }), 20);
        return {
          catClientRect: catElement.getBoundingClientRect(),
          resizing: true
        };
      }
    });
  }
  async componentDidMount() {
    window.addEventListener("resize", this.windowResize);
    window.addEventListener("mousemove", this.windowMousemove);
    const { current: catElement } = this.refCat;
    await catElement.decode();
    this.windowResize();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.windowResize);
    window.removeEventListener("mousemove", this.windowMousemove);
  }
  render() {
    return (
      <figure className={$style.figure} onClick={this.figureClick}>
        <img src={cat} ref={this.refCat} className={$style.cat} />
        {this.state.bat && (
          <img src={bat} ref={this.refBat} className={$style.bat} />
        )}
      </figure>
    );
  }
}
