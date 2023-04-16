export default function Display(props: { text: string }) {
    return (
        <div className={'display-row'}>
            <div className={'calculator-display'}>
                <p>{props.text}</p>
            </div>
        </div>
    )
}