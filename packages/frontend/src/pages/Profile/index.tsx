import styles from './Profile.module.css';

export default function Profile() {
  return (
    <div id={styles.container}>
      <header>
        <div>
          <h1>Artheni Januer</h1>
          <span>arth.janu@usp.br</span>
        </div>

        <span>+55 (16) 98765-4321</span>
      </header>

      <section>
        <h2>Dados Pessoais</h2>
        <div className={styles.profileRow}>
          <span>CPF: 123.321.123-12</span>
          <span>RG: 12.123.123-1</span>
        </div>

        <div className={styles.profileRow}>
          <span>
            Data de nascimento: <time dateTime="2003-03-21">21/03/2003</time>
          </span>
        </div>
      </section>

      <section>
        <h2>Endereço de entrega</h2>
        <address>Rua XIX de Abril, 2023</address>
      </section>
    </div>
  );
}
