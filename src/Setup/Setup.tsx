import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Error from "../Components/Error";
import { server } from "../vars/vars"
axios.post(`${server}/test`, { data: "hello" });
export default function Setup() {
    const [username, setUserName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const hash = Cookies.get("hash")

    useEffect(() => {
        axios.post(`${server}/userInfo`, { hash: hash }).then(res => {
            if (res.data.status === "ok") {
                setUserName(res.data.message.username);
                setLoading(false)
            } else {
                setError(res.data.message.text);
                setLoading(false);
            }
        })
    }, []);
    if (error !== "") {
        return <Error message="error"></Error>
    }
    if (loading) {
        return <div>Loading</div>
    }
}