function Badge({ children, color, className = "" }) {
    return (
        <span className={`badge ${className}`} style={color ? { background: color } : {}}>
            {children}
        </span>
    );
}

export default Badge;