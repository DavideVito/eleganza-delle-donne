import { FirestoreDataConverter, addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, setDoc, where } from "firebase/firestore"
import { app } from "../../Firebase/Firebase";
import { Appuntamento, CreaAppuntamentoModel } from "../../Models/Appuntamento/Appuntamento";

const firestore = getFirestore(app)




const converter: FirestoreDataConverter<Appuntamento> = {
    fromFirestore: (snapshot) => {
        const data = snapshot.data();

        return {
            id: snapshot.id,
            titolo: data.titolo,
            cliente: data.cliente,
            sottotitolo: data.sottotitolo,
            inizio: data.inizio.toDate(),
            fine: data.fine.toDate()

        }
    },

    toFirestore: (oggetto) => {

        return {
            cliente: oggetto.cliente,
            titolo: oggetto.titolo,
            sottotitolo: oggetto.sottotitolo,
            inizio: oggetto.inizio,
            fine: oggetto.fine
        } as Appuntamento

    }
}

const getCollezioneAppuntamenti = (data: Date) => {
    const nome = `appuntamenti_${data.getFullYear()}_${data.getMonth()}`

    return collection(firestore, nome).withConverter(converter);
}


const CreaAppuntamento = async (payload: CreaAppuntamentoModel): Promise<string> => {
    const ris = await addDoc(getCollezioneAppuntamenti(payload.inizio), payload)

    return ris.id;
}

const AggiornaAppuntamento = async (id: string, payload: CreaAppuntamentoModel): Promise<void> => {
    const documento = doc(getCollezioneAppuntamenti(payload.inizio), id)

    return setDoc(documento, payload)

}

const GetAppuntamenti = async (inizio: Date, fine: Date): Promise<Appuntamento[]> => {
    let predicates = []

    predicates.push(where("inizio", ">=", inizio))
    predicates.push(where("inizio", "<=", fine))

    const q = query(getCollezioneAppuntamenti(inizio), ...predicates, orderBy("inizio", "asc"));
    const ris = await getDocs(q);

    return ris.docs.map(x => x.data());
}

const DeleteAppuntamento = async (id: string, inizio: Date): Promise<void> => {
    const documento = doc(getCollezioneAppuntamenti(inizio), id);

    await deleteDoc(documento);
}

export default {
    CreaAppuntamento,
    GetAppuntamenti,
    DeleteAppuntamento,
    AggiornaAppuntamento
}