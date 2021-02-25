import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number
}

interface ChallengesContextData {
  level: number
  currentExperience: number;
  challengesCompletos: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompletos, setChallengesCompletos] = useState(0);
  const [activeChallenge, setCctiveChallenge] = useState(null);

  function levelUp(){
    setLevel(level +1 );
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setCctiveChallenge(challenge);  
  }


  return(
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompletos,
        activeChallenge,
        levelUp,
        startNewChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
