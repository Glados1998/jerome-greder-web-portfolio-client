export default function ProgrammingTag({programmingTag}) {
    return (
        <span className="programming-label">
            {programmingTag.attributes.label}
        </span>
    )
}