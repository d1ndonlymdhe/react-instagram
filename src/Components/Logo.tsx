import react from "react"
type LogoPropsTypes = {
    className?: string;
}
export default function Logo(props: LogoPropsTypes) {
    const { className } = props;
    return <span className={`font-billabong flex justify-center items-center ${className}`}>
        <div>Instagram</div></span>
}