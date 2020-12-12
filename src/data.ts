import items2019 from "./2019/items.json";
import items2020 from "./2020/items.json";
import thanks2019 from "./2019/thanks.json";
import thanks2020 from "./2020/thanks.json";
interface Data {
  tumblr?: string;
  categories: string[];
  items: Item[];
  thanks: string[];
}
interface Item {
  category: string;
  title: string;
  subtitle?: string;
  when: string;
  where: string;
  with: string;
  to?: string;
}
export const _2019: Data = {
  tumblr: "https://yeongchoi.tumblr.com/",
  categories: [
    "DJING",
    "MIX SHOW",
    "LIVE",
    "EXHIBITION",
    "VIDEO SOUNDS",
    "INTERVIEW"
  ],
  items: items2019,
  thanks: thanks2019
};
export const _2020: Data = {
  categories: [
    "RELEASED",
    "EXHIBITION",
    "DJING",
    "MIX SHOW",
    "LIVE",
    "DIRECTING",
    "VIDEO SOUNDS",
    "FEATURED"
  ],
  items: items2020,
  thanks: thanks2020
};
