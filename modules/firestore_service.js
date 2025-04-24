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
export const addzookeeper = async (staff, idZookeeper,) => {
  const zookeeperRef = doc(db, `Staff/${idZookeeper}`);
  await setDoc(zookeeperRef, { name: staff });
};

export const addEnclosures = async (idZookeeper, idEnclosures) => {
  const EnclosuredRef = doc(db, `Staff/${idZookeeper}/enclosuresManaged/${idEnclosures}`);
  await setDoc(EnclosuredRef, { name: idEnclosures });
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


// Query compuesta: Filtrar animales por zoo_id, especie y edad
export async function filtrarAnimalesCompuesto(zooId, species, minAge) {
  try {
    const animalsCollection = collection(db, "Animals"); // Referencia a la colección "Animals"
    const q = query(
      animalsCollection,
      where("zoo_id", "==", zooId), // Condición 1: ID del zoológico
      where("species", "==", species), // Condición 2: Especie
      where("age", ">", minAge) // Condición 3: Edad mayor a minAge
    );

    const querySnapshot = await getDocs(q); // Ejecutar la consulta

    const animals = [];
    querySnapshot.forEach((doc) => {
      animals.push({ id: doc.id, ...doc.data() }); // Agregar cada documento al array
    });

    console.log("Animales filtrados:", animals);
    return animals;
  } catch (error) {
    console.error("Error al realizar la consulta compuesta:", error);
    throw error;
  }
}
