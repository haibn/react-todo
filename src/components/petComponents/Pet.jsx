import { useState } from "react";
import PropTypes from "prop-types";
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

function Pet({completedTodosCount}) {
    return (
        <div className={styles.mediaQueryWrapper}>
            <div className={styles.catHomeWrapper}>

                {
                    completedTodosCount == 1 && 
                    <div className={styles.levelOneCat}>
                        <LevelOneCat/>
                        <div className={styles.levelOneCatCss}>
                            <Cat/>
                        </div>
                    </div>
                }

                {
                    completedTodosCount == 2 &&
                    <div className={styles.levelOneCatInBox}>
                        <LevelOneCat/>
                        <div className={styles.levelOneCatInBoxCss}>
                            <CatInBox/>
                        </div>
                    </div>
                }

                {
                    completedTodosCount == 3 && 
                    <div className={styles.levelTwoCat}>
                        <LevelTwoCat/>
                        <div className={styles.catCss}>
                            <Cat/>
                        </div>
                    </div>
                }

                {
                    completedTodosCount == 4 && 
                    <div className={styles.levelThreeCat}>
                        <LevelThreeCat/>
                        <div className={styles.catCss}>
                            <Cat/>
                        </div>
                    </div>
                }

                {
                    completedTodosCount == 5 && 
                    <div className={styles.levelFourCat}>
                        <LevelFourCat/>
                        <div className={styles.catCss}>
                            <Cat/>
                        </div>
                    </div>
                }

                {
                    completedTodosCount == 6 && 
                    <div className={styles.levelFiveCat}>
                        <LevelFiveCat/>
                        <div className={styles.catCss}>
                            <Cat/>
                        </div>
                    </div>
                }

                {
                    completedTodosCount == 7 && 
                    <div className={styles.levelSixCat}>
                        <LevelSixCat/>
                        <div className={styles.catCss}>
                            <Cat/>
                        </div>
                    </div>
                }

                {
                    completedTodosCount == 8 && 
                    <div className={styles.levelSevenCat}>
                        <LevelSevenCat/>
                        <div className={styles.catCss}>
                            <Cat/>
                        </div>
                    </div>
                }

                {
                    completedTodosCount == 9 && 
                    <div className={styles.levelEightCat}>
                        <LevelEightCat/>
                        <div className={styles.catCss}>
                            <Cat/>
                        </div>
                    </div>
                }

                {
                    completedTodosCount == 10 && 
                    <div className={styles.levelNineCat}>
                        <LevelNineCat/>
                        <div className={styles.catCss}>
                            <Cat/>
                        </div>
                    </div>
                }

                {
                    completedTodosCount == 11 && 
                    <div className={styles.levelTenCat}>
                        <LevelTenCat/>
                        <div className={styles.catCss}>
                            <Cat/>
                        </div>
                    </div>
                }

                {
                    completedTodosCount == 12 && 
                    <div className={styles.levelElevenCat}>
                        <LevelElevenCat/>
                        <div className={styles.catCss}>
                            <Cat/>
                        </div>
                    </div>
                }

                {
                    completedTodosCount == 13 && 
                    <div className={styles.levelTwelveCat}>
                        <LevelTwelveCat/>
                        <div className={styles.catCss}>
                            <Cat/>
                        </div>
                    </div>
                }

                {
                    completedTodosCount == 14 && 
                    <div className={styles.levelThirteenCat}>
                        <LevelThirteenCat/>
                        <div className={styles.catCss}>
                            <Cat/>
                        </div>
                    </div>
                }

                {
                    completedTodosCount == 15 && 
                    <div className={styles.finalBossCat}>
                        <CatFinalBoss/>
                        <div className={styles.catCss}>
                            <Cat/>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

Pet.propTypes = {
    completedTodosCount: PropTypes.func
}

export default Pet