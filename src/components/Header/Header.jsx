
import styles from './Header.module.css'
import {useDarkMode} from "../../contexts/DarkModeContext";
import {HiMoon, HiSun} from "react-icons/hi";

export default function Header({ filters, filter, onFilterChange }) {
  const {darkMode, toggleDarkMode} = useDarkMode();
  return (
    <header className={styles.header}>
      <button onClick={ () => toggleDarkMode() } className={styles.toggle}>
        { !darkMode ? <HiMoon /> : <HiSun /> }
      </button>
      <ul className={styles.filters}>
        { filters.map((item, idx) => (
            <li key={idx}>
              <button
                className={`${styles.filter} ${filter === item && styles.selected}`}
                onClick={ () => onFilterChange(item) }
              >
                { item }
              </button>
            </li>
        ))}
      </ul>
    </header>
  )
}
