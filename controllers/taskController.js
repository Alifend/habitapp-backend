import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";

export const addTask = async (req, res) => {
  const data = req.body;
  const id = req.params.uid;
  let NewTask;
  const Task_10 = collection(db, "Users", id, "tasks");
  NewTask = await addDoc(Task_10, {
    ...data,
  }).catch((err) => console.log(err));
  res.send(NewTask.id);
};

export const getTasks = async (req, res) => {
  const id = req.params.uid;
  const taskRef = collection(db, "Users", id, "tasks");
  const taskSnapshot = await getDocs(taskRef).catch((err) => console.log(err));
  const taskList = taskSnapshot.docs.map((data) => data.data());
  res.send(taskList);
};

export const getTask = async (req, res) => {
  const id = req.params.uid;
  const tid = req.params.tid;
  const taskRef = doc(db, "Users", id, "tasks", tid);
  console.log(id, tid);
  const SingleTask = await (await getDoc(taskRef)).data();
  res.send(SingleTask);
};

export const deleteTask = async (req, res) => {
  const id = req.params.uid;
  const tid = req.params.tid;
  const taskRef = doc(db, "Users", id, "tasks", tid);
  await deleteDoc(taskRef).catch((err) => console.log(err));
  res.send("Borrado con éxito");
};

export const editTask = async (req, res) => {
  const { uid, tid } = req.params;
  const { body } = req;
  const taskRef = doc(db, "Users", uid, "tasks", tid);
  await updateDoc(taskRef, body).catch((err) => console.log(err));
  res.send("Editado con éxito");
};
