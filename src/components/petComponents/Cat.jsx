import styles from "./Cat.module.css";
import CatSpriteSheet from "../../assets/cat/catSpriteSheet.png"

function Cat() {
    return (
        <div className={styles.catContainer}>
            <img className={styles.catSpriteSheet} src={CatSpriteSheet} alt="Cat"></img>
        </div>
    )
}

export default Cat;