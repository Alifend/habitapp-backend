import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase.js";

export const addUser = async (req, res) => {
  const data = req.body;
  let newUser;
  const userRef = collection(db, "Users");
  newUser = await addDoc(userRef, {
    data,
  }).catch((err) => console.log(err));
  res.send(newUser.id);
};

export const getUser = async (req, res) => {
  const id = req.params.uid;
  const userRef = doc(db, "Users", id);
  const singleUser = await (await getDoc(userRef)).data();
  res.send(singleUser);
};

export const getUsers = async (req, res) => {
  const usersRef = collection(db, "Users");
  const userList = await (await getDoc(userRef)).data();
  res.send(userList);
};

export const deleteUser = async (req, res) => {
  const id = req.params.uid;
  const userRef = doc(db, "Users", id);
  await deleteDoc(userRef).catch((err) => console.log(err));
  res.send("Borrado con éxito");
};

export const editUser = async (req, res) => {
  const { uid } = req.params;
  const { body } = req;
  const userRef = doc(db, "Users", uid);
  await updateDoc(userRef, body).catch((err) => console.log(err));
  res.send("Editado con éxito");
};

export const userLogin = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const userRef = collection(db, "Users");
    const q = query(
      userRef,
      where("username", "==", username),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);

    let results;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      results = { id, data };
    });
    res.send(results);
  }
};
