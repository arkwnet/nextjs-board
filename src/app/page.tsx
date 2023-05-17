"use client";

// import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebase";

export default function Home() {
  const [data, setData] = useState(new Array());

  useEffect(() => {
    const data = async () => {
      let temp = new Array();
      let output = new Array();
      const querySnapshot = await getDocs(collection(db, "post"));
      querySnapshot.forEach((doc) => {
        temp.push({
          id: doc.id,
          name: doc.data().name,
          message: doc.data().message,
        });
      });
      temp
        .slice()
        .reverse()
        .forEach((doc) => {
          output.push(
            <p key={doc.id}>
              {"名前: " + doc.name + " / 投稿ID: " + doc.id}
              <br />
              {doc.message}
            </p>
          );
        });
      await setData(output);
    };
    data();
  }, []);

  return (
    <main>
      <div>{data}</div>
    </main>
  );
}
