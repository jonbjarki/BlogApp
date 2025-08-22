interface ParagraphWithMaxLengthProps
    extends React.HTMLProps<HTMLParagraphElement> {
    text: string;
    maxLength: number;
}

export default function ParagraphWithMaxLength({
    text,
    maxLength = 20,
    ...props
}: ParagraphWithMaxLengthProps) {
    if (text.length <= maxLength) {
        return <p {...props}>{text}</p>;
    }
    const truncated = text.slice(0, maxLength).trim() + "...";
    return <p {...props}>{truncated}</p>;
}
