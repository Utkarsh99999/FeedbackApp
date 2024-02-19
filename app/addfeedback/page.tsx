"use client"
import styles from "./page.module.scss";
import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from "next/link";

const FeedbackDetail = () => {
  const [category, setCategory] = useState("Feature");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [title,setTitle] = useState('');
  const [detail,setDetail] = useState('');
  const [error,setError1] = useState('');
  const [error2,setError2] = useState('');

  const handleSortChange = (option:string) => {
    setCategory(option);
    setIsDropdownOpen(false);
  };

  useEffect(()=>{
    if(title){
      setError2('');
    }
    else{
      setError2('detail cant be empty');
    }
    if(detail){
      setError1('');
    }
    else{
      setError1('title cant be empty');
    }
  },[title,detail]);

  const handleAdding = () => {
    if(!detail){
     setError1('Detail Cant be empty');
    }
    if(!title){
     setError2('Title Cant be empty');
    }

    const formData = {
      title:title,
      detail:detail,
      category:category
    }
  };

  return (
    <div className={styles.main}>

      <div className={styles.container}>

        <div className={styles.Nav}>
          <span className={styles.back}>
            <Link href={"/"}>{`< Go Back`}</Link>{" "}
          </span>
        </div>
       
        <div className={styles.flatBox}>

        <span className={styles.image}>
        <Image  src="/icon-plus.svg" height={30} width={30} alt="plus-icon"/>
        </span>
        
         <h2>Create New Feedback</h2>

         <div className={styles.input}>
          <p style={{fontWeight:'bold'}}>Feedback Title</p>
          <p>Add a short, descriptive headline</p>
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} style={error2?{border:'1.2px solid red'}:{}}/>
          {error2 && (
            <p style={{color:'red'}}>{error2}</p>
          )}
         </div>

        <div className={styles.select} 
         onMouseEnter={() => setIsDropdownOpen(true)}
         onMouseLeave={() => setIsDropdownOpen(false)}>
         <p>{category}</p>
         {isDropdownOpen?
         (<Image src="/icon-arrow-up.svg" width={15} height={10} alt="arrow-up"/>):
         (<Image src="/icon-arrow-down.svg" width={15} height={10} alt="arrow-down"/>)} 
         </div>

         <div className={isDropdownOpen?styles.scaleIn:styles.scaleOut}>
              {isDropdownOpen && (
                <div
                  className={styles.dropdown}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div
                    onClick={() => handleSortChange("Feature")}
                    className={styles.dropdownItem}
                  >
                   <p> Feature</p>
                   {(category==="Feature")?<Image src="/icon-check.svg" height={12} width={15} alt="cheack"/>:''} 
                  </div>
                  <hr />
                  <div
                    onClick={() => handleSortChange("UI")}
                    className={styles.dropdownItem}
                  >
                   <p> UI</p>
                   {(category==="UI")?<Image src="/icon-check.svg" height={12} width={15} alt="cheack"/>:''} 
                  </div>
                  <hr />
                  <div
                    onClick={() => handleSortChange("UX")}
                    className={styles.dropdownItem}
                  >
                   <p>UX</p>
                   {(category==="UX")?<Image src="/icon-check.svg" height={12} width={15} alt="cheack"/>:''}
                  </div>
                  <hr />
                  <div
                    onClick={() => handleSortChange("Enhancement")}
                    className={styles.dropdownItem}
                  >
                   <p>Enhancement</p>
                    {(category==="Enhancement")?<Image src="/icon-check.svg" height={12} width={15} alt="cheack"/>:''}
                  </div>
                  <hr />
                  <div
                    onClick={() => handleSortChange("Bug")}
                    className={styles.dropdownItem}
                  >
                    <p>Bug</p>
                    {(category==="Bug")?<Image src="/icon-check.svg" height={12} width={15} alt="cheack"/>:''}
                  </div>
                </div>
              )}
         </div>

         <div className={styles.input}>
          <p style={{fontWeight:'bold'}}>Feedback Detail</p>
          <p>Include any specific comments on what should be improved, added, etc.</p>
          <input type="text" value={detail} onChange={(e)=>setDetail(e.target.value)} style={error?{border:'1.2px solid red'}:{}}/>
          {error && (
            <p style={{color:'red'}}>{error}</p>
          )}
         </div>

         <div className={styles.button}>
          <button className={styles.btn2}><Link href="/">Cancel</Link> </button>
          <button className={styles.btn1} onClick={handleAdding}>Add Feedback</button>
         </div>
         
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetail;
