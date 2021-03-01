import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number
}

interface ChallengesContextData {
  level: number
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode
  level: number;
  currentExperience: number;
  challengesCompleted: number; 
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
 }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  // operador ??, se rest.level não tiver uma valor atribuido
  // o 1 ou qalquer outro valor vai ser passado pro useState
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4 ,2);


  // quando o segundo parametro do useEffect é um []
  // significa que o a função vai ser executada uma única vez
  function isMobile() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true;
     }
    else {
       return false;
      }
  }

  useEffect(() => {
    if (!isMobile){
      Notification.requestPermission();
    }
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])

  function levelUp(){
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  };

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  };

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    // por equanto esse do iphone, criar um no LMMS.

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification(`Movement | New ${challenge.type} Challange`, {
        body: `Valendo ${challenge.amount} xp!`
      })
    }

  };
  function resetChallenge(){
    setActiveChallenge(null);
  };

  function completeChallenge() {
    if (!activeChallenge){
      return;
    }
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1)
  };

  return(
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal
      }}
    >
      {children}
      { isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
