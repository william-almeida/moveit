import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from '../styles/pages/Index.module.css';

export default function Profile() {
  const { push } = useRouter();
  const [username, setUsername] = useState('');
  
  return (
    <div className={ styles.container }>

      <div className={ styles.logo }>
        <img src="/icons/logo-home.svg" alt=""/>
      </div>

      <div className={ styles.landingPage }>
        <div className={ styles.login }>
          <img src="logo-full.svg" alt="Logo"/>
          <h1>Bem-vindo</h1>
          <div>
            <img src="/icons/github.svg" alt="GitHub"/>
            <p>faça login com o seu github para começar</p>
          </div>
          <form
            onSubmit={function (eventInfo) {
              push(`/${username}`);
              eventInfo.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="Digite seu username"
              onChange={(eventInfo) => {
                setUsername(eventInfo.target.value);
              }}
            />
            <button type="submit" disabled={username.length === 0}>
              <img src="/icons/arrow.svg" alt="Login"/>
            </button>
          </form>
        </div>
      </div>
      
    </div>
  )
}