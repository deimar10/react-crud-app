import React from "react";
import {useEffect, useState} from "react";
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";

function ServerLogs({setView}) {
    const [logs, setLogs] = useState([]);
    const columns = [
        { field: 'timeStamp', headerName: 'Date-Time', width: 200 },
        { field: 'originalUrl', headerName: 'URL', width: 100 },
        { field: 'method', headerName: 'Method', width: 70 },
        { field: 'id', headerName: 'Id', width: 225},
        { field: 'new', headerName: 'New', width: 250 },
        { field: 'original', headerName: 'Original', width: 250}
    ]

    const handleBack = () => {
        setView(false);
    }

    useEffect(() => {
        handleGET();
    }, []);

    const handleGET = () => {
        axios.get("http://localhost:3001/posts/logs")
            .then(response => {
                setLogs(response.data);
            })
    }
    return (
        <>
            <div id="logsMainSection">
                <h2>Logs</h2>
                <button id="logsBackBtn" onClick={handleBack}>Back</button>
                <DataGrid
                    getRowId={(row) => row.timeStamp + row.id}
                    rows={logs}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    autoPageSize={false}
                />
            </div>
        </>
    )
}

export default ServerLogs;
