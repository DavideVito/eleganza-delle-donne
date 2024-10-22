import { Card, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClienteContext } from "../../Contexts/Cliente/ClienteContext";
import { Cliente } from "../../Models/Cliente/Cliente";
import { CercaClienti } from "./CercaClienti";

const groupUsersByFirstLetter = (clienti: Cliente[]) => {
    return clienti.reduce((groups: any, cliente) => {
        const firstLetter = cliente.nomePersona.charAt(0).toUpperCase();

        if (!groups[firstLetter]) groups[firstLetter] = [];

        groups[firstLetter].push(cliente); // Add cliente to the group
        return groups;
    }, {});
};


export const ListaClienti = () => {
    const navigate = useNavigate(); // useNavigate hook for programmatic navigation

    const handleContactClick = (cliente: Cliente) => {
        navigate(`/cliente/${cliente.id}`);
    };

    const clienti = useContext(ClienteContext)

    const [groupedUser, setGroupedUser] = useState({})
    const [clientiFiltrati, setClientiFiltrati] = useState<Cliente[]>([])

    useEffect(() => {
        if (!clienti) {
            setClientiFiltrati([])
            return
        }

        setClientiFiltrati(clienti!)

    }, [clienti])

    useEffect(() => {


        if (!clientiFiltrati) {
            setGroupedUser({})
            return
        }

        setGroupedUser(groupUsersByFirstLetter(clientiFiltrati))
    }, [clientiFiltrati])




    return <>
        <div style={{ height: "1rem" }}></div>
        <CercaClienti clienti={clienti} setClientiFiltrati={setClientiFiltrati} />

        <div style={{ height: "1rem" }}></div>

        <Card sx={{ width: "100%", height: "50vh", overflowY: "auto" }}>
            <List>

                {
                    Object.keys(groupedUser).sort().map((letter) => (<div key={letter}>
                        <Typography variant="h6" sx={{
                            position: 'sticky',
                            top: 0,
                            backgroundColor: 'white',
                            zIndex: 1,
                            padding: '8px 16px',
                            boxShadow: '0 2px 2px -2px gray',
                        }}>
                            {letter}
                        </Typography>

                        {
                            //@ts-ignore
                            groupedUser[letter].map((x, index) => (<React.Fragment key={x.id}>
                                <ListItem
                                    onClick={() => handleContactClick(x)} // Handle click event for redirection
                                    sx={{
                                        cursor: 'pointer', // Makes the ListItem look clickable
                                        '&:hover': { backgroundColor: '#f0f0f0' }, // Hover effect
                                    }}
                                >
                                    <ListItemText
                                        primary={x.nomePersona}
                                    />

                                </ListItem>

                            </React.Fragment>))
                        }



                    </div>)
                    )}







            </List>
        </Card>
    </>




}