
export const InfoCliente = () => {

    const props = ["name", "tel"];
    const opts = { multiple: false };

    async function getContatto() {

        const supported = "contacts" in navigator;

        debugger
        if (!supported) return


        try {
            //@ts-ignore
            const contacts = await navigator.contacts.select(props, opts);
        } catch (ex) {
            // Handle any errors here.
        }
    }

    return <div>
        <button onClick={getContatto}>Get Contatti</button>
    </div>

}
