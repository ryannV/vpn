import styles from './Menu.module.css';
import { useNavigate } from "react-router-dom";
import moon from '../assets/moon.svg';
import arrow from '../assets/arrow.svg';

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
                    <div className={styles.menu_content_single}>
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