export default function SocialBtn({children, ...props}) {
    return (
        <a {...props} href={props.href} target='_blank' rel={'noopener noreferrer'}>
            <span className={"btn-social"}>
            {children}
            </span>
        </a>
    )
}