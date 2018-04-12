export const createPlayerListHeaderItem = (id, onClick = () => {}, text = '', className = 'playerstats-stat') => (
    <button key={id} className={className} id={id} onClick={onClick}>
        {text}
    </button>
);
