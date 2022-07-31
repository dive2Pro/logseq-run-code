import React, { useEffect, useRef } from "react";
import { useAppVisible } from "./utils";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla2", label: "中国的 东西" },
];

type BuilderType = "page" | "tag" | "text";

abstract class BaseBuilder<T> {
  abstract type: BuilderType;

  /**
   * 返回的 query 数据
   */
  abstract output(): string;

  // update must notify
  abstract update(v: T): void;

  data: any;
}

// class PageRefBuilder extends BaseBuilder<''> {

// }

function App() {
  const innerRef = useRef<HTMLDivElement>(null);
  const visible = useAppVisible();
  useEffect(() => {
    async function fn() {
      const pages = await logseq.DB.datascriptQuery(`[:find ?e
:where
[?b :block/name ?e]
]`);
      console.log(pages, "2 pages ");
    }
    fn();
  }, []);

  if (visible) {
    return (
      <main
        className="backdrop-filter backdrop-blur-md fixed inset-0 flex items-center justify-center"
        onClick={(e) => {
          if (!innerRef.current?.contains(e.target as any)) {
            window.logseq.hideMainUI();
          }
        }}
      >
        <div>
          <h2>Filters</h2>
          <div>
            has reference to
            <Select
              options={options}
              onChange={(s) => {
                console.log(s);
              }}
            />
          </div>
        </div>
        <div ref={innerRef} className="text-size-2em"></div>
      </main>
    );
  }
  return null;
}

export default App;
