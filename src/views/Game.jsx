import React from "react";
import styles from '../styles/app.module.css';
import { Link } from "react-router-dom";
import { remove, ref } from "firebase/database";
import { db } from "../services/firebase";

import { useSession } from "../contexts/SessionContext"

export default function Game() {
    const { session, setSession } = useSession()

    const endGame = () => {
        remove(ref(db, `/${session.id}`))
        setSession(null)
    }

    return (
        <div>
            <h2>Game</h2>
            <p>Session Id: {session.id}</p>
            <Link to={{
                pathname:"/roadmap",
                state: session.id
            }}>Roadmap</Link>
            <Link to="/">
                <button className={styles.button} onClick={endGame}>End Game</button>
            </Link>
        </div>
    )
}
