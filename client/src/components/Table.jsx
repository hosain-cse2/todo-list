import React from "react";
import styles from "./table.scss";
import icons from "./assets/icons";

const Table = ({ data, onDelete, onEdit }) => {
  return (
    <div className={styles.table}>
      {data.map((item, index) => (
        <div key={index} className={styles.row}>
          <p>{item.title}</p>
          <p>{item.description}</p>
          <img
            src={icons.delete}
            className={styles.graphic}
            onClick={() => onDelete && onDelete(item)}
            title="Delete"
          />
          <img
            src={icons.edit}
            className={styles.graphic}
            onClick={() => onEdit && onEdit(item)}
            title="Edit"
          />
        </div>
      ))}
    </div>
  );
};

export default Table;
