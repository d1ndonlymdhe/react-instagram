import React from "react";

export default function Setup(props: SetupPageProps) {
    const { setGlobalUsername, globalUsername } = props
    return (<div>Welcome {globalUsername}
    </div>)
}