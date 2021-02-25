import { createContext, ReactNode, useState } from 'react';

export const ChallengesContext = createContext({});

interface ChallengeProviderProps {
  children: ReactNode
}

export function ChallengesProvider({ children }: ChallengeProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompletos, setChallengesCompletos] = useState(0);


  function levelUp(){
    setLevel(level +1 );
  }

  function startNewChallenge(){
    console.log('New Challenge');
  }


  return(
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompletos,
        levelUp,
        startNewChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
