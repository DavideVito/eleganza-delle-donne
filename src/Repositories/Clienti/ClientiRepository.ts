import { FirestoreDataConverter, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc, where } from "firebase/firestore"
import { Cliente, CreaClienteModel } from "../../Models/Cliente/Cliente";
import { app } from "../../Firebase/Firebase";

const firestore = getFirestore(app)



const converter: FirestoreDataConverter<Cliente> = {
    fromFirestore: (snapshot) => {
        const data = snapshot.data();

        return {
            id: snapshot.id,
            nomePersona: data.nomePersona,
            numeroTelefono: data.numeroTelefono
        }
    },

    toFirestore: (oggetto) => {

        return {
            nomePersona: oggetto.nomePersona,
            numeroTelefono: oggetto.numeroTelefono
        } as Cliente

    }
}

const collezioneClienti = collection(firestore, "Clienti").withConverter(converter);



const CreaCliente = async (payload: CreaClienteModel): Promise<string> => {
    const ris = await addDoc(collezioneClienti, payload)

    return ris.id;
}

const AggiornaCliente = async (id: string, payload: CreaClienteModel): Promise<void> => {

    const documento = await doc(collezioneClienti, id)

    await setDoc(documento, payload)
}


const GetCliente = async (id: string): Promise<Cliente | null> => {
    const ref = doc(collezioneClienti, id).withConverter(converter)

    const ris = await getDoc(ref);

    if (!ris.exists()) return null;

    return ris.data()!
}

const GetClienti = async (): Promise<Cliente[]> => {
    const q = query(collezioneClienti, orderBy("nomePersona"));

    const ris = await getDocs(q);

    return ris.docs.map(x => x.data());
}

const EliminaCliente = async (cliente: Cliente): Promise<void> => {
    const documento = doc(collezioneClienti, cliente.id)

    return await deleteDoc(documento)
}

export default {
    CreaCliente,
    GetCliente,
    GetClienti,
    EliminaCliente,
    AggiornaCliente
}