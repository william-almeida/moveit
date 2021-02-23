import { CompletedChallenges } from "../components/CompletedChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { Countdown } from "../components/Countdown";
import styles from '../styles/pages/Home.module.css';
import Head from "next/head";

export default function Home() {
  return (
    <div className={ styles.container }>
      <Head>
        <title>Início | Movement</title>
      </Head>

      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>
          

        </div>
      </section>
    </div>
  );
}
