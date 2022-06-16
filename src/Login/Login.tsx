import React, { useRef } from "react";
import axios from "axios";
import { server } from "../vars/vars";
export default function LoginPage(props: LoginPageProps) {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        axios.post(`${server}/login`, { username: username, password: password }).then(res => {
            console.log(res.data);
        })
    }
    return (
        <>
            <div>Login</div>
            <form name="login" onSubmit={handleSubmit}>
                Username<br />
                <input type="text" ref={usernameRef} />
                <br />Password<br />
                <input type="password" ref={passwordRef} />
                <input type="submit" value="submit" />
            </form>
        </>
    )
}