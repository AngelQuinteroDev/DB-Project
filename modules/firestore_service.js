import { db } from './firebase_init.js';
import { doc, setDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Función para crear un zoológico
export const createZoo = async (zooId, zooName) => {
  const zooRef = doc(db, `Zoos/${zooId}`);
  await setDoc(zooRef, { name: zooName });
};

// Función para agregar un animal
export const addAnimal = async (zooId, animalId, animalData) => {
  const animalRef = doc(db, `Zoos/${zooId}/Animals/${animalId}`);
  await setDoc(animalRef, animalData);
};

//Agregar cuidadores
export const addzookeeper = async (staff, idZookeeper) => {
  const zookeeperRef = doc(db, `Staff/${idZookeeper}`);
  await setDoc(zookeeperRef, { name: staff });
};

// Función para obtener todos los animales de un zoológico
export const getAnimalsByZoo = async (zooId) => {
  const animalsRef = collection(db, `Zoos/${zooId}/Animals`);
  const snapshot = await getDocs(animalsRef);
  const animalsList = snapshot.docs.map(doc => doc.data());
  return animalsList;
};

// Función para obtener animales filtrados por especie
export const getAnimalsBySpecies = async (zooId, species) => {
  const animalsRef = collection(db, `Zoos/${zooId}/Animals`);
  const q = query(animalsRef, where("species", "==", species));
  const snapshot = await getDocs(q);
  const animalsList = snapshot.docs.map(doc => doc.data());
  return animalsList;
};

export async function mostrarTodo() {
  const staffSnapshot = await getDocs(collection(db, 'Staff'));

  for (const staffDoc of staffSnapshot.docs) {
    console.log('👷 Zookeeper:', staffDoc.id, staffDoc.data());

    const enclosuresRef = collection(db, `Staff/${staffDoc.id}/EnclosuresManaged`);
    const enclosuresSnapshot = await getDocs(enclosuresRef);

    for (const encDoc of enclosuresSnapshot.docs) {
      console.log('  🏠 Enclosure:', encDoc.id, encDoc.data());

      const animalsRef = collection(db, `Staff/${staffDoc.id}/EnclosuresManaged/${encDoc.id}/Animals`);
      const animalsSnapshot = await getDocs(animalsRef);

      for (const animalDoc of animalsSnapshot.docs) {
        console.log('    🐒 Animal:', animalDoc.id, animalDoc.data());
      }
    }
  }
}
