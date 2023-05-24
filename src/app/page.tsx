"use client";

// import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import db from "./firebase";

export default function Home() {
  const [data, setData] = useState(new Array());
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    let temp = new Array();
    let output = new Array();
    const querySnapshot = await getDocs(
      query(collection(db, "post"), orderBy("datetime"))
    );
    querySnapshot.forEach((doc) => {
      temp.push({
        id: doc.id,
        datetime: doc.data().datetime,
        message: doc.data().message,
        name: doc.data().name,
      });
    });
    temp
      .slice()
      .reverse()
      .forEach((doc) => {
        output.push(
          <p key={doc.id}>
            {"名前: " +
              doc.name +
              " / 投稿日時: " +
              doc.datetime.toDate() +
              " / 投稿ID: " +
              doc.id}
            <br />
            {doc.message}
          </p>
        );
      });
    await setData(output);
  };

  const post = async () => {
    const docRef = await addDoc(collection(db, "post"), {
      datetime: new Date(),
      message: message,
      name: name,
    });
    setName("");
    setMessage("");
    load();
  };

  return (
    <main>
      <div>
        名前:
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        内容:
        <br />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <br />
        <button onClick={post}>投稿</button>
      </div>
      <hr />
      <div>{data}</div>
    </main>
  );
}
