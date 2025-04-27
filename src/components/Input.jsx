import styles from './Input.module.css'

const Input = ({ type, name, id, value, onChange, placeholder, label, darkMode, setDarkMode }) => {
    return (
        <>
            <label className={styles.label} htmlFor={label}>{label}</label>
            <input
                className={darkMode ? styles.inputs_dark : styles.inputs}
                type={type}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onWheel={(e) => e.target.blur()}
            />
        </>
    );
};

export default Input;
