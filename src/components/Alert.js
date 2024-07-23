import React, { useContext } from "react";
import alertContext from "../context/alerts/AlertContext";

export default function Alert() {
    const altContext = useContext(alertContext);
    const {alert} = altContext;
    return (
        <div style={{ minHeight: "40px" }}>
            {alert && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.massege}                    
                </div>
            )}
        </div>
    );
}