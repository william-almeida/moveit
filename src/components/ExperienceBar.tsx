import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  return(
    <header className={ styles.experienceBar }>
      <span>0 xp</span>
      <div>
        <div style={{ width: '60%'}}></div>
        <span
          className={ styles.currentExperience }
          style={{ left: '60%' }}
        > 
          360 xp
        </span>
      </div>
      {/* [!] Remover esse atalho pro repositorio do github  */}
      <span>600 xp | <a href="https://github.com/william-almeida/moveit/" target="_blank">GitHub</a></span> 
    </header>
  );
}