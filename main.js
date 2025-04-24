import {
  createZoo, updateZoo, getZoo,
  getAnimalsByZoo, getAnimalsBySpecies,
  getAnimalsSortedByAge
} from './zooService.js';

import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase-init.js';

document.getElementById("saveZooBtn").addEventListener("click", async () => {
  const id = document.getElementById("zooId").value;
  const name = document.getElementById("zooName").value;
  await createZoo(id, { name });
  alert("Zoo guardado.");
});

document.getElementById("viewAnimalsBtn").addEventListener("click", async () => {
  const id = document.getElementById("zooIdView").value;
  const animals = await getAnimalsByZoo(id);
  const list = document.getElementById("animalList");
  list.innerHTML = "";
  animals.forEach(animal => {
    const card = document.createElement("div");
    card.className = "animal-card";
    card.textContent = `🐾 ${animal.name} (${animal.species}) - ${animal.age} años`;
    list.appendChild(card);
  });
});

document.getElementById("addAnimalBtn").addEventListener("click", async () => {
  const zooId = document.getElementById("zooIdAnimal").value;
  const animalId = document.getElementById("animalId").value;
  const name = document.getElementById("animalName").value;
  const species = document.getElementById("animalSpecies").value;
  const age = parseInt(document.getElementById("animalAge").value);

  const animalRef = doc(db, `Zoos/${zooId}/Animals/${animalId}`);
  await setDoc(animalRef, { name, species, age });
  alert("Animal agregado.");
});

document.getElementById("filterBySpeciesBtn").addEventListener("click", async () => {
  const zooId = document.getElementById("zooIdSpecies").value;
  const species = document.getElementById("speciesFilter").value;
  const animals = await getAnimalsBySpecies(zooId, species);
  const list = document.getElementById("speciesList");
  list.innerHTML = "";
  animals.forEach(animal => {
    const card = document.createElement("div");
    card.className = "animal-card";
    card.textContent = `🦎 ${animal.name} - ${animal.species}`;
    list.appendChild(card);
  });
});

document.getElementById("sortByAgeBtn").addEventListener("click", async () => {
  const zooId = document.getElementById("zooIdSort").value;
  const animals = await getAnimalsSortedByAge(zooId);
  const list = document.getElementById("sortedList");
  list.innerHTML = "";
  animals.forEach(animal => {
    const card = document.createElement("div");
    card.className = "animal-card";
    card.textContent = `🐘 ${animal.name} - ${animal.age} años`;
    list.appendChild(card);
  });
});
