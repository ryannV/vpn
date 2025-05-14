import styles from './Menu.module.css';
import { useNavigate } from "react-router-dom";
import arrow from '../assets/arrow_light.svg';
import moon from '../assets/dark_mode.svg';
import home from '../assets/home.svg';

const Menu = ({ hide, darkMode, setDarkMode }) => {
    const navigate = useNavigate();

    return (
        <div>
            {hide ? (
                <div className={styles.menu_email}>
                    <div className={styles.menu_content}>
                        <img
                            src={arrow}
                            alt="arrowLeft"
                            onClick={() => navigate('/')}
                            className={styles.icon_email}
                        />
                        <h2 className={styles.titulo_email}>Digifarma</h2>
                        <img
                            src={moon}
                            alt="darkMode"
                            onClick={() => setDarkMode(!darkMode)}
                            className={styles.icon_moon_email}
                        />
                    </div>
                </div>
            ) : (
                <div className={styles.menu}>
                    <div className={styles.menu_content}>
                        <img
                            src={home}
                            alt="darkMode"
                            className={styles.icon}
                        />
                        <h2 className={styles.titulo}>Digifarma</h2>
                        <img
                            src={moon}
                            alt="darkMode"
                            onClick={() => setDarkMode(!darkMode)}
                            className={styles.icon}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Menu;