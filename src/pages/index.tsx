
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import styles from './home.module.scss'

export default function Home() {

  return (
    <div className={styles.bodyHome}>
      <section>
        <div className={styles.aboutArea}>
          <h1>Sobre o programa</h1>
          <div className={styles.about}>
            <p>Lorem ipsum non rhoncus praesent viverra elit, turpis ultricies volutpat rhoncus nostra cursus ultrices, imperdiet scelerisque netus facilisis tristique. convallis vel consectetur tellus lacinia sem vitae in orci, ut odio conubia ad consequat fringilla arcu, habitant felis lacinia molestie urna odio curae. cras a curabitur praesent diam ipsum mi quisque dolor gravida, vehicula ut semper etiam eget fusce urna luctus, ad curabitur fermentum donec faucibus torquent quis mi. odio morbi habitasse elit iaculis sit platea, integer etiam interdum et metus congue, pretium ornare tellus conubia lacus. euismod taciti porta aliquet inceptos lacinia elit tellus aliquet, cras nunc class ut sed pulvinar.

            Nulla tincidunt rhoncus et vestibulum eget potenti, viverra diam feugiat sem donec erat ut, ultricies leo viverra volutpat metus. nisi conubia suspendisse inceptos non convallis auctor amet, sem accumsan habitasse etiam feugiat est eleifend turpis, nam elit laoreet curabitur pulvinar a. blandit et congue dolor magna sed arcu euismod ad, duis quisque habitant fringilla suscipit tristique per facilisis etiam, aliquet amet sodales elementum sollicitudin suspendisse tellus. luctus dictum nisl etiam eget ut placerat conubia arcu tellus nec urna ultrices enim, posuere eros purus tempus quis vitae convallis non pulvinar vehicula senectus euismod. </p>
          </div>
        </div>
      </section>
      <section className={styles.section2}>
        <h1>Resultados</h1>
        <div className={styles.resultArea}>
          <div className={styles.result}>
            <img src="1941.jpg" alt="" />
            <img src="1941.jpg" alt="" />
            <img src="1941.jpg" alt="" />
            <img src="1941.jpg" alt="" />
            <img src="1941.jpg" alt="" />
            <img src="1941.jpg" alt="" />
          </div>
        </div>
      </section>
    </div>
  )
}
