import { db } from './firebase_init.js';
import { doc, setDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";


// Function to create a zoo
export const createZoo = async (zooId, zooName) => {
  const zooRef = doc(db, `Zoos/${zooId}`);
  await setDoc(zooRef, { name: zooName });
};


// Function to add an animal
export const addAnimal = async (zooId, animalId, animalData) => {
  const animalRef = doc(db, `Zoos/${zooId}/Animals/${animalId}`);
  await setDoc(animalRef, animalData);
};


//Add caregivers
export const addzookeeper = async (staff, idZookeeper,) => {
  const zookeeperRef = doc(db, `Staff/${idZookeeper}`);
  await setDoc(zookeeperRef, { name: staff });
};

export const addEnclosures = async (idZookeeper, idEnclosures) => {
  const EnclosuredRef = doc(db, `Staff/${idZookeeper}/enclosuresManaged/${idEnclosures}`);
  await setDoc(EnclosuredRef, { name: idEnclosures });
};

// Function to get all the animals in a zoo
export const getAnimalsByZoo = async (zooId) => {
  const animalsRef = collection(db, `Zoos/${zooId}/Animals`);
  const snapshot = await getDocs(animalsRef);
  const animalsList = snapshot.docs.map(doc => doc.data());
  return animalsList;
};


// Function to obtain animals filtered by species
export const getAnimalsBySpecies = async (zooId, species) => {
  const animalsRef = collection(db, `Zoos/${zooId}/Animals`);
  const q = query(animalsRef, where("species", "==", species));
  const snapshot = await getDocs(q);
  const animalsList = snapshot.docs.map(doc => doc.data());
  return animalsList;
};

export async function showAll() {
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


// Compound query: Filter animals by zoo_id, species, and age
export async function filtrarAnimalesCompuesto(zooId, species, minAge) {
  try {
    const animalsCollection = collection(db, "Animals"); // Reference to the "Animals" collection
    const q = query(
      animalsCollection,
      where("zoo_id", "==", zooId), // Condition 1: Zoo ID
      where("species", "==", species), // Condition 2: Species
      where("age", ">", minAge) // Condition 3: Age greater than minAge
    );

    const querySnapshot = await getDocs(q); // Run the quey

    const animals = [];
    querySnapshot.forEach((doc) => {
      animals.push({ id: doc.id, ...doc.data() }); // Add each document to the array
    });

    console.log("Animales filtrados:", animals);
    return animals;
  } catch (error) {
    console.error("Error al realizar la consulta compuesta:", error);
    throw error;
  }
}
