import Head from "next/head";
import styles from '../styles/pages/Home.module.css';

import {GetServerSideProps} from 'next';
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { CountdownProvider } from '../contexts/CountdownContext';
import { CompletedChallenges } from "../components/CompletedChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

interface userGithub {
  name: string;
  avatar_url: string;
}

interface HomeProps {
  isMobile: boolean;
  user: userGithub;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps ) {
  const { user } = props
  return (
    <ChallengesProvider
      isMobile = { props.isMobile}
      level = { props.level }
      currentExperience = {props.currentExperience}
      challengesCompleted = { props.challengesCompleted }

    >
      <div className={ styles.container }>
        <Head>
          <title>Início | Movement</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile {...user} />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { username } = ctx.params;
  const response = await fetch(`https://api.github.com/users/${username}`);
  const user = await response.json();
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  
  const ua = ctx.req.headers['user-agent'];
  const isMobile = Boolean(ua.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
  // são string por conta dos cookies, por isso a conversão pra Number
  
  return {

    props: {
      isMobile,
      user,
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
    }
  }
}
