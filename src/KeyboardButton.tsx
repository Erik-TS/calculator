export default function KeyboardButton(props: { symbol: string, onclick: Function }) {
    return (
        <div className={'keyboard-key'} onClick={(e) => props.onclick(props.symbol)}>
            <p>{props.symbol}</p>
        </div>
    )
}