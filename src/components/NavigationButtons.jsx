import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import styles from "./NavigationButtons.module.css";

function NavigationButtons() {
  return (
    <div className={styles.navButtons}>
      <Link to="/" className={styles.navLink}>Home</Link>
      <Link to="/pet" className={styles.navLink}>Pet</Link>
    </div>
  );
}

export default NavigationButtons;