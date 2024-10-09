import { FirestoreDataConverter, addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query } from "firebase/firestore"
import { app } from "../../Firebase/Firebase";
import { Appuntamento, CreaAppuntamentoModel } from "../../Models/Appuntamento/Appuntamento";

const firestore = getFirestore(app)



const converter: FirestoreDataConverter<Appuntamento> = {
    fromFirestore: (snapshot) => {
        const data = snapshot.data();

        return {
            id: snapshot.id,
            titolo: data.titolo,
            sottotitolo: data.sottotitolo,
            inizio: data.inizio.toDate(),
            fine: data.fine.toDate()

        }
    },

    toFirestore: (oggetto) => {

        return {
            titolo: oggetto.titolo,
            sottotitolo: oggetto.sottotitolo,
            inizio: oggetto.inizio,
            fine: oggetto.fine
        } as Appuntamento

    }
}

const collezioneAppuntamenti = collection(firestore, "Appuntamenti").withConverter(converter);



const CreaAppuntamento = async (payload: CreaAppuntamentoModel): Promise<string> => {
    const ris = await addDoc(collezioneAppuntamenti, payload)

    return ris.id;
}

// const AggiornaAppuntamento = async (payload: Appuntamento): Promise<void> => {
//     debugger
//     const documento = doc(collezioneAppuntamenti, payload.id)
//     return updateDoc(documento, payload)
// }


const GetAppuntamenti = async (): Promise<Appuntamento[]> => {
    const q = query(collezioneAppuntamenti);

    const ris = await getDocs(q);

    return ris.docs.map(x => x.data());
}

const DeleteAppuntamento = async (id: string): Promise<void> => {

    const documento = doc(collezioneAppuntamenti, id);

    await deleteDoc(documento);

}

export default {
    CreaAppuntamento,
    GetAppuntamenti,
    DeleteAppuntamento
}