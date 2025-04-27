import styles from './Menu.module.css';
import { useNavigate } from "react-router-dom";

const Menu = ({ hide, darkMode, setDarkMode}) => {
    const navigate = useNavigate();

    return (
        <div>
            {hide ?
                <div className={styles.menu_email}>
                    <svg
                        onClick={() => navigate('/')}
                        className={styles.icon_email}
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                    </svg>
                    <h2 className={styles.titulo_email}>Digifarma</h2>
                    <svg 
                        onClick={() => setDarkMode(!darkMode)}
                        className={styles.icon_moon_email}
                        xmlns="http://www.w3.org/2000/svg" 
                        width="30" 
                        height="30" 
                        fill="currentColor" 
                        viewBox="0 0 16 16">
                        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                    </svg>
                </div>
                :
                <div className={styles.menu}>
                    <h2 className={styles.titulo}>Digifarma</h2>
                    <svg 
                        onClick={() => setDarkMode(!darkMode)}
                        className={styles.icon}
                        xmlns="http://www.w3.org/2000/svg" 
                        width="30" 
                        height="30" 
                        fill="currentColor" 
                        viewBox="0 0 16 16">
                        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                    </svg>
                </div>
            }
        </div> 
    )
}

export default Menu;