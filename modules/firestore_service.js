import { db } from './firebase_init.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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
