import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";

const Header = (props: any) => {
  const categories = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

  const handleCategoryClick = (category: string) => {
    props.setSelected(category);
  };

  return (
    <div>
      <div className={props.show ? styles.drawerOpen : styles.drawerClose}>
        <div className={styles.filter}>
          {categories.map((category) => (
            <span
              key={category}
              className={styles.advice}
              style={
                props.selected === category
                  ? { backgroundColor: "rgba(70, 97, 230, 1)", color: "white" }
                  : {}
              }
              onClick={() => handleCategoryClick(category)}
            >
              {category.toUpperCase()}
            </span>
          ))}
        </div>

        <div className={styles.roadmap}>
          <span>
            <h4>Roadmap</h4>
            <Link href="/roadmap">View</Link>
          </span>
          {["Planned", "In-Progress", "Live"].map((status) => (
            <span key={status}>
              <p>{status}</p>
              <p>4</p>
            </span>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Header;
