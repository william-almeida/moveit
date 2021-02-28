import { useContext } from 'react';
import styles from '../styles/components/Profile.module.css';
import { ChallengesContext } from '../contexts/ChallengesContext';


interface UserGitHub {
  name: string;
  avatar_url: string;
}

export function Profile(user: UserGitHub){
  const { level } = useContext(ChallengesContext);
  return(
    <div className={ styles.profileContainer }>
      <img src={user?.avatar_url} alt={user?.name} />
      <div>
        <div className={ styles.user }>
          <strong>
            {user?.name}
            
          </strong>
          <button type='button'>
              <img src="/icons/exit.svg" alt=""/>
          </button>
        </div>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level { level }
        </p>
        
      </div>
    </div>
  );
}