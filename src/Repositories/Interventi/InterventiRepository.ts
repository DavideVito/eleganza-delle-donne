import { FirestoreDataConverter, addDoc, collection, doc, getDoc, getDocs, getFirestore, limit, query } from "firebase/firestore"
import { app } from "../../Firebase/Firebase";
import { CreaInterventoModel, Intervento } from "../../Models/Cliente/Intervento";
import { Cliente } from "../../Models/Cliente/Cliente";


import { getDownloadURL, getStorage, listAll, ref, uploadBytes, UploadResult } from "firebase/storage"

const firestore = getFirestore(app)
const storage = getStorage(app)


const converter: FirestoreDataConverter<any, Intervento> = {
    fromFirestore: (snapshot) => {
        const data = snapshot.data();

        return {
            id: snapshot.id,
            data: data.data,
            descrizione: data.descrizione
        }
    },

    toFirestore: (oggetto) => {

        return {
            data: oggetto.data,
            descrizione: oggetto.descrizione
        } as Intervento

    }
}

const getCollezione = (cliente: string) => collection(firestore, "Clienti", cliente, "Interventi").withConverter(converter)


const CreaIntervento = async (payload: CreaInterventoModel): Promise<string> => {

    const collezione = getCollezione(payload.cliente.id)
    const ris = await addDoc(collezione, payload)

    return ris.id;
}

const GetInterventi = async (cliente: Cliente): Promise<Intervento[]> => {

    const q = query(getCollezione(cliente.id), limit(10));

    const ris = await getDocs(q);

    return ris.docs.map(x => x.data());
}

const GetIntervento = async (idCliente: string, idIntervento: string): Promise<Intervento | null> => {

    const ref = doc(getCollezione(idCliente), idIntervento)

    const ris = await getDoc(ref)

    if (!ris.exists()) return null;

    return ris.data()

}

const AddFile = async (idIntervento: string, file: File): Promise<UploadResult> => {
    const fileRef = ref(storage, `${idIntervento}/${file.name}`)
    const buffer = await file.arrayBuffer()

    return uploadBytes(fileRef, buffer)
}

const GetFiles = async (idIntervento: string): Promise<string[]> => {
    const cartella = ref(storage, `${idIntervento}`)

    const ris = await listAll(cartella)

    return await Promise.all(ris.items.map(x => getDownloadURL(x)))

}

export default {
    CreaIntervento,
    GetInterventi,
    GetIntervento,
    AddFile,
    GetFiles
}