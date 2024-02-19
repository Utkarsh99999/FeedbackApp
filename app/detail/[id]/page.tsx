"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { ProductRequest } from "../../types";
import { Comment } from "../../types";

interface CommentListProps {
  comments: Comment[];
}
interface RepliesListProps {
  replies: Comment[];
  show: boolean;
}
interface CommentComponentProps {
  id: string;
}
interface CommentComponentProps {
  params: CommentComponentProps;
}


const CommentComponent: React.FC<CommentComponentProps> = ({ params }) => {
  const [detail, setDetail] = useState<ProductRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/userdata")
      .then((response) => response.json())
      .then((data) => {
        const result = data[0].productRequests.filter(
          (val: ProductRequest) => val._id === params.id
        );
        setDetail(result);
        console.log(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [params]);

  if (loading) {
    return <h1>Loading .....</h1>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.Nav}>
          <span className={styles.back}>
            <Link href={"/"}>{`< Go Back`}</Link>{" "}
          </span>

          <span>
            <Link href="/editfeedback">
              <button className={styles.btn}>Edit Feedback</button>
            </Link>
          </span>
        </div>

        <div className={styles.flatBox}>
          <div className={styles.upvote}>
            <Image
              src="/icon-arrow-up.svg"
              height={10}
              width={15}
              alt="icon-arrow-up"
            />
            <p>{detail[0].upvotes}</p>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.content}>
              <h3>{detail[0].title}</h3>
              <p>{detail[0].description}</p>
              <div className={styles.advice}>{detail[0].category}</div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <Image src="/icon-comments.svg" height={20} width={20} alt="" />
              <p>{detail[0].comments.length}</p>
            </div>
          </div>
        </div>

        <div className={styles.comments}>
          <h2>{`${detail[0].comments.length} Comments`}</h2>
          <CommentList comments={detail[0].comments} />
        </div>

        <div className={styles.addComments}>
          <h1>Add Comments</h1>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Add Comment"
          />
          <div className={styles.limitBtn}>
            <p>250 Words Required</p>
            <button className={styles.btn1}>Post Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
};


const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const initialShowStates = comments.map(() => false);
  const [showStates, setShowStates] = useState(initialShowStates);
  const [showReply, setShowReply] = useState(false);
  const [message, setMessage] = useState("");

  const handleCommentsReply = (userId: String) => {

    fetch("http://localhost:3001/post/comment/reply", {
      method: "POST",
      body: JSON.stringify({
        message: message,
        userId: userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => response.json())
    .then((json)=>console.log(json));
  };

  return (
    <>
      {comments?.map((val, index) => (
        <div
          key={val.id}
          style={{
            width: "100%",
            padding: "1rem 0rem",
            borderBottom: "1px solid grey",
            textAlign: "left",
          }}
        >
          <div className={styles.upperBox}>
            <span className={styles.info}>
              <img
                src={`http://localhost:3001/assets/${val.user.image
                  .split("/")
                  .pop()}`}
                height={30}
                width={30}
                alt="image"
                style={{ borderRadius: "50%", border: "none" }}
              />
              <span>
                <p style={{ fontWeight: "bold" }}>{val.user.name}</p>
                <p>{val.user.username}</p>
              </span>
            </span>
            <span>
              <p
                className={styles.reply}
                onClick={() => {
                  const newShowStates = [...showStates];
                  newShowStates[index] = !newShowStates[index];
                  setShowStates(newShowStates);
                }}
              >
                Reply
              </p>
            </span>
          </div>

          <div className={styles.upperBox}>
            {showReply ? (
              <p
                className={styles.reply}
                onClick={() => setShowReply(!showReply)}
              >
                Hide Replies
              </p>
            ) : (
              <p
                className={styles.reply}
                onClick={() => setShowReply(!showReply)}
              >
                Show Replies
              </p>
            )}

            <span style={{ width: "85%" }}>{val.content}</span>
          </div>

          <div className={styles.lowerBox}>
            <ReplyList replies={val.replies} show={showReply} />
          </div>

          {showStates[index] && (
            <div className={styles.lowerBox} key={val.id}>
              <input
                type="text"
                name="addcomment"
                id="addcomment"
                placeholder="Reply"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button
                onClick={()=>handleCommentsReply(val._id)}
                id={val._id}
                className={styles.btn1}
              >
                Post Reply
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};


const ReplyList: React.FC<RepliesListProps> = ({ replies, show }) => {
  const initialShowStates = replies.map(() => false);
  const [showStates, setShowStates] = useState(initialShowStates);
  const [message, setMessage] = useState("");

  const handleRepliesReply = (userId: String) => {
    console.log(message,userId);
    fetch("http://localhost:3001/post/replies/reply", {
      method: "POST",
      body: JSON.stringify({
        message: message,
        id: userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => response.json())
    .then((json)=>console.log(json));
  };

  if (replies.length === 0 && show) {
    return <h4>No replies</h4>;
  }

  if (show && replies.length > 0) {
    return (
      <>
        {replies?.map((val, index) => (
          <div
            key={val.id}
            style={{
              width: "95%",
              padding: "1rem 1rem",
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
              gap: "1rem",
              borderLeft: "1px solid grey",
            }}
          >
            <div className={styles.upperBox}>
              <span className={styles.info}>
                <img
                  src={`http://localhost:3001/assets/${val.user.image
                    .split("/")
                    .pop()}`}
                  height={30}
                  width={30}
                  alt="image"
                  style={{ borderRadius: "50%", border: "none" }}
                />
                <span>
                  <p style={{ fontWeight: "bold" }}>{val.user.name}</p>
                  <p>{val.user.username}</p>
                </span>
              </span>
              <span>
                <p
                  className={styles.reply}
                  onClick={() => {
                    const newShowStates = [...showStates];
                    newShowStates[index] = !newShowStates[index];
                    setShowStates(newShowStates);
                  }}
                >
                  Reply
                </p>
              </span>
            </div>

            <div className={styles.lowerBox}>
              <span style={{ width: "85%" }}>{val.content}</span>
            </div>

            {showStates[index] && (
              <div className={styles.lowerBox} key={val.id}>
                <input
                  type="text"
                  name="addcomment"
                  id="addcomment"
                  placeholder="Reply"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <button
                  onClick={()=>handleRepliesReply(val._id)}
                  id={val._id}
                  className={styles.btn1}
                >
                  Post Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </>
    );
  }
};


export default CommentComponent;
