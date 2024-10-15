import { FirestoreDataConverter, addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query } from "firebase/firestore"
import { app } from "../../Firebase/Firebase";
import { CreaNotaModel, Nota as Nota } from "../../Models/Cliente/Nota";
import { Cliente } from "../../Models/Cliente/Cliente";



const firestore = getFirestore(app)


const converter: FirestoreDataConverter<any, Nota> = {
    fromFirestore: (snapshot) => {
        const data = snapshot.data();

        return {
            id: snapshot.id,
            data: data.data.toDate(),
            descrizione: data.descrizione
        }
    },

    toFirestore: (oggetto) => {

        return {
            data: oggetto.data,
            descrizione: oggetto.descrizione
        } as Nota

    }
}

const getCollezione = (cliente: string) => collection(firestore, "Clienti", cliente, "Note").withConverter(converter)


const CreaNota = async (payload: CreaNotaModel): Promise<string> => {

    const collezione = getCollezione(payload.cliente.id)
    const ris = await addDoc(collezione, payload)

    return ris.id;
}

const GetNote = async (cliente: Cliente): Promise<Nota[]> => {

    const q = query(getCollezione(cliente.id), orderBy("data", "desc"));

    const ris = await getDocs(q);

    return ris.docs.map(x => x.data());
}

const EliminaNota = async (cliente: Cliente, nota: Nota): Promise<void> => {
    const documento = doc(getCollezione(cliente.id), nota.id)

    return deleteDoc(documento)
}

export default {
    CreaNota,
    GetNote,
    EliminaNota
}