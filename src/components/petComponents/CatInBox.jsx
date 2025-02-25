import styles from "./CatInBox.module.css";
import CatInBoxSpriteSheet from "../../assets/cat/catInBoxSpriteSheet.png"

function CatInBox() {
    return (
        <div className={styles.catInBoxContainer}>
            <img className={styles.catInBoxSpriteSheet} src={CatInBoxSpriteSheet} alt="Cat In a Box"></img>
        </div>
    )
}

export default CatInBox;