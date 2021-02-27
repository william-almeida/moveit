import { useContext} from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';



export function Countdown() {
  
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown
  } = useContext(CountdownContext)

  // padStart, preence no início 5 => 05,
  // não vai pro contexto pois é particular
  // desse contexo, não da regra de negócio
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


  return(
    <div>
      <div className={ styles.countdownContainer }>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
        disabled
        type="button"
        className={ `${styles.countdownButton} ${styles.countdownButtonFinished}` }
        >
          Ciclo encerrado
          <img src="/icons/check-circle.svg" alt="Ciclo completo"/>
        </button>
      ) : (
        <>
          {isActive ? (
            <button
            type="button"
            className={ `${styles.countdownButton} ${styles.countdownButtonActive}` }
            onClick={resetCountdown}
            >
              Abandonar o ciclo
              <img src="/icons/abort-cycle.svg" alt="Cancelar ciclo"/>
            </button>
          ) : (
            <button
            type="button"
            className={ styles.countdownButton }
            onClick={startCountdown}
            >
              Iniciar um ciclo
              <img src="/icons/play-arrow.svg" alt="Iniciar ciclo"/>
            </button>
          )}
        </>
      )}

    </div>
  );
}