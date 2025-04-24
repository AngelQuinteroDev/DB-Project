import { db } from './firebase-init';
import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc,
  query, where, orderBy
} from 'firebase/firestore';

// 🔧 Referencias base
const zoosRef = collection(db, 'Zoos');
const staffRef = collection(db, 'Staff');

// 📌 CRUD para Zoos
export async function createZoo(zooId, data) {
  await setDoc(doc(zoosRef, zooId), data);
}

export async function getZoo(zooId) {
  const docSnap = await getDoc(doc(zoosRef, zooId));
  return docSnap.exists() ? docSnap.data() : null;
}

export async function updateZoo(zooId, newData) {
  await updateDoc(doc(zoosRef, zooId), newData);
}

export async function deleteZoo(zooId) {
  await deleteDoc(doc(zoosRef, zooId));
}

// 🐒 Obtener animales de un zoo específico
export async function getAnimalsByZoo(zooId) {
  const animalsRef = collection(db, `Zoos/${zooId}/Animals`);
  const snapshot = await getDocs(animalsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 🏠 Obtener jaulas de un animal
export async function getEnclosureForAnimal(zooId, animalId) {
  const enclosureRef = doc(db, `Zoos/${zooId}/Animals/${animalId}/Enclosure/enclosure`);
  const snapshot = await getDoc(enclosureRef);
  return snapshot.exists() ? snapshot.data() : null;
}

// 👷 CRUD para Zookeeper
export async function createZookeeper(zookeeperId, data) {
  await setDoc(doc(staffRef, zookeeperId), data);
}

export async function getZookeeper(zookeeperId) {
  const snapshot = await getDoc(doc(staffRef, zookeeperId));
  return snapshot.exists() ? snapshot.data() : null;
}

// 🔎 Query: animales de una jaula manejada por un zookeeper
export async function getAnimalsManagedByZookeeper(zookeeperId) {
  const enclosuresRef = collection(db, `Staff/${zookeeperId}/EnclosuresManaged`);
  const enclosuresSnapshot = await getDocs(enclosuresRef);

  const allAnimals = [];

  for (const encDoc of enclosuresSnapshot.docs) {
    const animalsRef = collection(db, `Staff/${zookeeperId}/EnclosuresManaged/${encDoc.id}/Animals`);
    const animalsSnapshot = await getDocs(animalsRef);

    animalsSnapshot.forEach(animalDoc => {
      allAnimals.push({ enclosure: encDoc.id, ...animalDoc.data() });
    });
  }

  return allAnimals;
}

// 📘 Query con índice: animales por especie
export async function getAnimalsBySpecies(zooId, species) {
  const animalsRef = collection(db, `Zoos/${zooId}/Animals`);
  const q = query(animalsRef, where("species", "==", species)); // Asegúrate de tener un índice
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}

// 🔢 Query ordenada: animales ordenados por edad
export async function getAnimalsSortedByAge(zooId) {
  const animalsRef = collection(db, `Zoos/${zooId}/Animals`);
  const q = query(animalsRef, orderBy("age"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}
