import { useState } from "react";

const items = ["ABOUT", "PROJECTS", "STACK", "CONTACT"];

export default function Menu() {
  const [selected, setSelected] = useState(0);

  return (
    <ul className="mt-4 space-y-1">
      {items.map((item, i) => (
        <li
          key={item}
          onClick={() => setSelected(i)}
          className={`cursor-pointer ${
            selected === i ? "text-yellow-400" : "text-cyan-400"
          }`}
        >
          [{i}] {item}
        </li>
      ))}
    </ul>
  );
}