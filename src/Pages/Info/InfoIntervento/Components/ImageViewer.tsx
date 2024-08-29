import React from "react";

export const ImageViewer = ({ urls }: { urls: string[] | undefined }) => {



    if (typeof urls === "undefined") return "Carico";

    return <div style={{ display: "flex", gap: "1rem" }}>
        {urls.map((x, i) => <React.Fragment key={i}>
            <img src={x} width={200} height={200} />
        </React.Fragment>)}
    </div>;
};
