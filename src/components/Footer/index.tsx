import styles from './styles.module.scss'

export function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <span>Desenvolvido por João</span>
            <div className={styles.logoContainer}>
                <a href="https://www.facebook.com">
                    <img src="facebook.svg" alt="facebook"/>
                </a>
                <a href="/">
                    <img src="instagram.svg" alt="instagram"/>
                </a>
                <a href="/">
                    <img src="youtube.svg" alt="youtube"/>
                </a>              
            </div>
        </footer>
    )
}