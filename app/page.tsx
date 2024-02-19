"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import { ProductRequest } from "./types";
import Header from "./header";

export default function Home() {
  const [show, setShow] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("all");
  const [product, setProduct] = useState<ProductRequest[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<ProductRequest[]>([]);
  const [sortBy, setSortBy] = useState("most-upvotes");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [planned, setPlanned] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [live, setLive] = useState([]);

  const handleSortChange = (option: string) => {
    setSortBy(option);
    setIsDropdownOpen(false);
  };

  const filterProductsByCategory = (category: any) => {
    setSelected(category);
    setFilteredProduct(
      category === "all"
        ? product
        : product.filter((val) => val.category === category)
    );
  };

  useEffect(() => {
    fetch("http://localhost:3001/userdata")
      .then((response) => response.json())
      .then((data) => {
        const planned = data[0].productRequests.filter(
          (val: ProductRequest) => val.status === "planned"
        );
        const inProgress = data[0].productRequests.filter(
          (val: ProductRequest) => val.status === "in-progress"
        );
        const live = data[0].productRequests.filter(
          (val: ProductRequest) => val.status === "live"
        );

        setPlanned(planned);
        setInProgress(inProgress);
        setLive(live);
        setProduct(data[0].productRequests);
        setFilteredProduct(data[0].productRequests);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      {window.innerWidth < 650 ? (
        <Header
          show={show}
          setShow={setShow}
          selected={selected}
          setSelected={setSelected}
        />
      ) : (
        ""
      )}

      <main className={styles.main} onClick={() => setIsDropdownOpen(false)}>
        <div className={styles.Box1}>
          <div className={styles.radialGrad}>
            <span>
              <p>Eqaim</p>
              <p>Feedback Board</p>
            </span>
            <span>
              <Image
                src={show ? "/cancelIcon.png" : "/icon-hamburger.svg"}
                onClick={() => setShow(!show)}
                height={show ? 30 : 20}
                width={35}
                style={{ filter: show ? "invert(100%)" : "none" }}
                alt="hamburger-icon"
              />
            </span>
          </div>

          <div className={styles.filter}>
            {["all", "ui", "ux", "enhancement", "bug", "feature"].map(
              (category) => (
                <span
                  key={category}
                  className={styles.advice}
                  style={
                    selected === category
                      ? {
                          backgroundColor: "rgba(70, 97, 230, 1)",
                          color: "white",
                        }
                      : {}
                  }
                  onClick={() => filterProductsByCategory(category)}
                >
                  {category.toUpperCase()}
                </span>
              )
            )}
          </div>

          <div className={styles.roadmap}>
            <span>
              <h4>Roadmap</h4>
              <Link href="/roadmap">View</Link>
            </span>
            {["Planned", "In-Progress", "Live"].map((status) => (
              <span key={status}>
                <p style={{ fontWeight: "100", fontSize: "small" }}>{status}</p>
                <p>{status.toLowerCase().length}</p>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.Box2}>

          <div className={styles.topNav}>
            <div className={styles.navOptions1}>
              <Image
                src="/icon-suggestions.svg"
                height={30}
                width={30}
                alt="icon-suggestions"
              />
              <p className={styles.Sugest}>
                {filteredProduct.length} Suggestions
              </p>
              <div
                onMouseEnter={() => setIsDropdownOpen(true)}
                style={{ cursor: "pointer" }}
              >
                Sort by: {sortBy}
                {isDropdownOpen && (
                  <div
                    className={
                      isDropdownOpen ? styles.scaleIn : styles.scaleOut
                    }
                  >
                    <div
                      className={styles.dropdown}
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      {[
                        "most-upvotes",
                        "least-upvotes",
                        "most-comments",
                        "least-comments",
                      ].map((item) => (
                        <React.Fragment key={item}>
                          <div
                            onClick={() => handleSortChange(item)}
                            className={styles.dropdownItem}
                          >
                            {item
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </div>
                          <hr />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.navOptions2}>
              <Link href="/addfeedback">
                <button className={styles.btn1}>+ Add Feedback</button>
              </Link>
            </div>
          </div>

          {filteredProduct.length > 0 ? (
            <>
              {filteredProduct.map((val: ProductRequest) => (
                <div key={val._id} className={styles.flatBox}>
                  <div className={styles.upvoteContainer}>
                    <span className={styles.upvote}>
                      <Image
                        src="/icon-arrow-up.svg"
                        height={10}
                        width={15}
                        alt="icon-arrow-up"
                      />
                      <p>{val.upvotes}</p>
                    </span>
                    <span className={styles.comment}>
                      <Image
                        src="/icon-comments.svg"
                        height={20}
                        width={20}
                        alt="icon-comments"
                      />
                      <p>{val.comments.length}</p>
                    </span>
                  </div>
                  <div className={styles.contentContainer}>
                    <div className={styles.content}>
                      <Link href={`/detail/${val._id}`}>
                        <h3>{val.title}</h3>
                      </Link>
                      <p>{val.description}</p>
                      <div className={styles.advice}>{val.category}</div>
                    </div>
                    <span className={styles.commentsDesktop}>
                      <Image
                        src="/icon-comments.svg"
                        height={20}
                        width={20}
                        alt="icon-comments"
                      />
                      <p>{val.comments.length}</p>
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className={styles.flatBoxEmpty}>
                <Image
                  src="/illustration-empty.svg"
                  height={200}
                  width={200}
                  alt="illustration-empty"
                />

                <div className={styles.EmptyText}>
                  <h3>There is no feedback yet.</h3>
                  <p>
                    Got a suggestion? Found a bug that needs to be squashed? We
                    love hearing about new ideas to improve our app.
                  </p>
                </div>

                <Link href="/addfeedback">
                  <button className={styles.btn1}> + Add Feedback</button>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
