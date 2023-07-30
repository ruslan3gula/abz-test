import "./styles.css";
import { useState, useEffect, useRef } from "react";

import { Sidebar } from "./Sidebar";
import { HamburgerMenu } from "./HamburgerMenu";
import { Main } from "./Main";

export default function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [reload, setReload] = useState(0);

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 490) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      <div className="header">
        <div className="logo">RG</div>
        <div class="menu_icon" onClick={() => setIsVisible(!isVisible)}>
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </div>
        <div className="buttons">
          <button>but1</button>
          <button>but2</button>
          <button>but3</button>
          <button>but4</button>
        </div>
        <button
          className="login_button"
          onClick={() => alert("Button is not activated yet")}
        >
          Login
        </button>
      </div>

      <div className="main">
        <Sidebar />
        <Main reload={reload} setReload={setReload} />
      </div>

      {isVisible ? <HamburgerMenu /> : null}
    </div>
  );
}
