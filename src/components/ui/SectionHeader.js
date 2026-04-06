function SectionHeader({ tag, title, sub }) {
    return (
        <div>
            <span className="section-tag">{tag}</span>
            <h2 className="ph2">{title}</h2>
            {sub && <p className="section-sub">{sub}</p>}
        </div>
    );
}

export default SectionHeader;