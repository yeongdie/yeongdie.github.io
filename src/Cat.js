import $style from "@src/Cat.scss";
import batGif from "@src/bat.gif";
import catJpeg from "@src/cat.jpg";
import catWebp from "@src/cat.webp";

const { useEffect, useRef, useState } = React;

const $link = document.createElement("link");
$link.setAttribute("rel", "prefetch");
$link.setAttribute("href", batGif);
document.querySelector("head").appendChild($link);

export default function Cat({ catClick }) {
  const [bat, setBat] = useState(false);
  const [catClientRect, setCatClientRect] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  });
  const [refBat, refCat] = [useRef(), useRef()];

  const figureClick = () => bat && catClick();

  const handleMouseMove = event => {
    const { clientX: x, clientY: y } = event;
    const { top, right, bottom, left } = catClientRect;
    const { current: batElement } = refBat;
    setBat(y > top && x < right && y < bottom && x > left);
    if (batElement) {
      const offset = 24;
      Object.assign(batElement.style, {
        top: `${y - offset}px`,
        left: `${x - offset}px`,
        visibility: "visible"
      });
    }
  };

  useEffect(function globalEffect() {
    const handleWindowResize = () => {
      const { current: catElement } = refCat;
      setCatClientRect(catElement.getBoundingClientRect());
    };
    (() => {
      const image = new Image();
      try {
        image.src = catWebp;
        return image.decode();
      } catch {
        image.src = catJpeg;
        return image.decode();
      }
    })().then(handleWindowResize);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <figure
      className={$style.figure}
      onClick={figureClick}
      onMouseMove={handleMouseMove}
    >
      <picture draggable="false" ref={refCat}>
        <source srcSet={catWebp} type="image/webp" className={$style.cat} />
        <img src={catJpeg} className={$style.cat} />
      </picture>
      {bat && <img src={batGif} ref={refBat} className={$style.bat} />}
    </figure>
  );
}
