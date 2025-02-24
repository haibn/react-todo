import { useState } from "react";
import styles from "./Pet.module.css"
import Cat from "./Cat";
import CatInBox from "./CatInBox";
import CatFinalBoss from "./CatFinalBoss";
import LevelOneCat from "./LevelOneCat";
import LevelTwoCat from "./LevelTwoCat";
import LevelThreeCat from "./LevelThreeCat";
import LevelFourCat from "./LevelFourCat";
import LevelFiveCat from "./LevelFiveCat";
import LevelSixCat from "./LevelSixCat";
import LevelSevenCat from "./LevelSevenCat";
import LevelEightCat from "./LevelEightCat";
import LevelNineCat from "./LevelNineCat";
import LevelTenCat from "./LevelTenCat";
import LevelElevenCat from "./LevelElevenCat";
import LevelTwelveCat from "./LevelTwelveCat";
import LevelThirteenCat from "./LevelThirteenCat";

function Pet() {
    return (
        <div className={styles.mediaQueryWrapper}>
            <div className={styles.catHomeWrapper}>

                <div className={styles.levelOneCat}>
                    <LevelOneCat/>
                    <div className={styles.levelOneCatCss}>
                        <Cat/>
                    </div>
                </div>

                <div className={styles.levelOneCatInBox}>
                    <LevelOneCat/>
                    <div className={styles.levelOneCatInBoxCss}>
                        <CatInBox/>
                    </div>
                </div>

                <div className={styles.levelTwoCat}>
                    <LevelTwoCat/>
                    <div className={styles.catCss}>
                        <Cat/>
                    </div>
                </div>

                <div className={styles.finalBossCat}>
                    <CatFinalBoss/>
                    <div className={styles.catCss}>
                        <Cat/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Pet