import styles from "./page.module.scss";
import {ProductRequest} from '../types';
const Tab = (props:Object) => {
  console.log(props);
  return (
    <>
      {(props.ComponentData)?.map((val:ProductRequest, index:Number) => (
        <div key={val._id} className={styles.tab}>
          <p>{val.status}</p>
          <h3>{val.title}</h3>
          <p>
            {val.description}
          </p>
          <span className={styles.advice}>{val.category}</span>
        </div>
      ))}
    </>
  );
};

export default Tab;
