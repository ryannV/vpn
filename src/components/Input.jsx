import styles from './Input.module.css'

const Input = ({ type, name, id, value, onChange, placeholder, label }) => {
    return (
        <>
            <label className={styles.label} htmlFor={label}>{label}</label>
            <input
                className={styles.inputs}
                type={type}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </>
    );
};

export default Input;
