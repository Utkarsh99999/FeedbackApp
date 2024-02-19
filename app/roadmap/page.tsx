"use client"
import styles from "./page.module.scss";
import Link from "next/link";
import Tabs from './roadmaptab';
import {useState,useEffect} from 'react';
import {ProductRequest} from '../types';

type ComponentData = ProductRequest[];

const FeedbackDetail = () => {
  const [selected,setSelected] = useState('');
  const [loading, setLoading] = useState(true);
  const [planned, setPlanned] = useState<ProductRequest[]>([]);
  const [inProgress, setInProgress] = useState<ProductRequest[]>([]);
  const [live,setLive] = useState<ProductRequest[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/userdata")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].productRequests);
        const result1 = data[0].productRequests.filter(
          (val:ProductRequest) => val.status === "planned"
        );
        const result2 = data[0].productRequests.filter(
          (val:ProductRequest) => val.status === "in-progress"
        );
        const result3 = data[0].productRequests.filter(
          (val:ProductRequest) => val.status === "live"
        );
        setPlanned(result1);
        setInProgress(result2);
        setLive(result3);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (loading) {
    return <h1>Loading .....</h1>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>

        <div className={styles.Nav}>
          <span className={styles.back}>
            <Link href={"/"}>{`< Go Back`}</Link>{" "}
            <h2>Roadmap</h2>
          </span>
          <span>
          <Link href="/addfeedback">
          <button className={styles.btn}>+ Add Feedback</button>
          </Link>  
          </span>
        </div>

        <div className={styles.mobileNavTab}>
        <a href="#planned">
        <div className={styles.navTab} 
        onClick={()=>{setSelected('planned')}}
        style={selected==="planned"?{borderBottom:'5px solid rgba(173, 31, 234, 1)'}:{}}>
         <h4>{`Planned (${planned.length})`}</h4>
         </div>
        </a>
        <a href="#in-proggress">
        <div className={styles.navTab} 
         onClick={()=>{setSelected('proggress')}}
         style={selected==="proggress"?{borderBottom:'5px solid rgba(173, 31, 234, 1)'}:{}}>
         <h4>{`In-proggress (${inProgress.length})`}</h4>
         </div> 
        </a>
        <a href="#live">
        <div className={styles.navTab} 
          onClick={()=>{setSelected('live')}}
         style={selected==="live"?{borderBottom:'5px solid rgba(173, 31, 234, 1)'}:{}}>
        <h4>{`Live (${live.length})`}</h4>
        </div>
        </a>
         
        </div>

        <div className={styles.tabContainerMain}>
        <div className={styles.tabContainer} id="planned">
         <div className={styles.navTab}>
         <h2>{`Planned (${planned.length})`}</h2>
         <p>Ideas prioritized for research</p>
         </div>
         <Tabs ComponentData={planned}/>
        </div>
        <div className={styles.tabContainer} id="in-proggress">
         <div className={styles.navTab}>
         <h2>{`In-proggress (${inProgress.length})`} </h2>
         <p>Ideas prioritized for research</p>
         </div>
         <Tabs ComponentData={inProgress}/>
        </div>
        <div className={styles.tabContainer} id="live">
        <div className={styles.navTab}>
         <h2>{`Live (${live.length})`}</h2>
         <p>Ideas prioritized for research</p>
        </div>
        <Tabs ComponentData={live}/>
        </div>
        </div>

      </div>
    </div>
  );
};

export default FeedbackDetail;
