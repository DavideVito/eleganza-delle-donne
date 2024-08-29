import { Intervento } from "../../../../Models/Cliente/Intervento";
import InterventiRepository from "../../../../Repositories/Interventi/InterventiRepository";
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader"; // Installed by "react-uploader".

export const ImageUploader = ({ intervento, onFileUploaded }: { intervento: Intervento, onFileUploaded: () => void }) => {



    const convertFile = async (x: any[]) => {

        const files = x.map(y => y.editedFile?.file ?? y.originalFile.file)

        const promises = files.map(x => InterventiRepository.AddFile(intervento.id, x));

        await Promise.all(promises);

        debugger

        onFileUploaded();
    }

    return <MyDropzone onDrop={(x) => convertFile(x)} />
};

const uploader = Uploader({
    apiKey: "free" // Get production API keys from Bytescale
});

const options = { multi: true };


const MyDropzone = ({ onDrop }: { onDrop: (x: any[]) => void }) => {


    return <UploadButton uploader={uploader}
        options={options}
        onComplete={onDrop}>
        {({ onClick }) =>
            <button onClick={onClick}>
                Carica un file
            </button>
        }
    </UploadButton>
}