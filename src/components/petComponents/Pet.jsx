import { useState } from "react";
import styles from "./Pet.module.css"
import Cat from "./Cat";
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
        <div className={styles.wrapper}>
            <div className={styles.catFinalBossHome}>
                <CatFinalBoss/>
                <LevelOneCat/>
                <LevelTwoCat/>
                <LevelThreeCat/>
                <LevelFourCat/>
                <LevelFiveCat/>
                <LevelSixCat/>
                <LevelSevenCat/>
                <LevelEightCat/>
                <LevelNineCat/>
                <LevelTenCat/>
                <LevelElevenCat/>
                <LevelTwelveCat/>
                <LevelThirteenCat/>
                <div className={styles.catCss}>
                    <Cat/>
                </div>
            </div>
        </div>
    )
}

export default Pet