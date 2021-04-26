import styles from './styles.module.scss'

export function DietCard(props) {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.titleContainer}>
                <h1>{props.title}</h1>
            </div>
            <div className={styles.mealContainer}>
                <div className={styles.meal}>
                    <strong>Café da manhã: </strong>
                    <span>{props.breakfast}</span>
                </div>
                <div className={styles.meal}>
                    <strong>Lanche: </strong>
                    <span>{props.morningSnack}</span>
                </div>
                <div className={styles.meal}>
                    <strong>Almoço: </strong>
                    <span>{props.lunch}</span>
                </div>
                <div className={styles.meal}>
                    <strong>Café da tarde: </strong>
                    <span>{props.afterSnack}</span>
                </div>
                <div className={styles.meal}>
                    <strong>Janta: </strong>
                    <span>{props.dinner}</span>
                </div>

            </div>            
        </div>
    )
}

