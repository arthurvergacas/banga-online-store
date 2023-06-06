import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './PlayInstrument.module.css';
import { useEffect, useState } from 'react';
import Spinner from 'components/Spinner';

interface PlayInstrumentProps {
  audioUrl: string;
}

export default function PlayInstrument({ audioUrl }: PlayInstrumentProps) {
  const [audio] = useState(new Audio(audioUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    audio?.addEventListener('ended', () => setIsPlaying(false));
    audio?.addEventListener('canplaythrough', () => setIsLoading(false));

    return () => {
      audio.pause();
      audio?.removeEventListener('ended', () => setIsPlaying(false));
      audio?.removeEventListener('canplaythrough', () => setIsLoading(false));
    };
  }, [audio]);

  const playInstrument = () => {
    setIsPlaying(true);
    audio.play();
  };

  const pauseInstrument = () => {
    setIsPlaying(false);
    audio.pause();
  };

  const getButtonIcon = (): JSX.Element => {
    if (isLoading) {
      return (
        <i aria-label="Carregando som do instrumento" style={{ fontSize: 'unset' }}>
          <Spinner size="2em" />
        </i>
      );
    }

    if (isPlaying) {
      return (
        <i aria-label="Pausar som do instrumento">
          <FontAwesomeIcon icon={faPause} />
        </i>
      );
    } else {
      return (
        <i aria-label="Tocar som do instrumento">
          <FontAwesomeIcon icon={faPlay} />
        </i>
      );
    }
  };

  return (
    <div id={styles.listenProductContainer}>
      <span>Ouça seu instrumento</span>
      <button type="button" onClick={() => (isPlaying ? pauseInstrument() : playInstrument())}>
        {getButtonIcon()}
      </button>
    </div>
  );
}
