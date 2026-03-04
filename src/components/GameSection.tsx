'use client';

import { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import { useLanguage } from '@/contexts/LanguageContext';

type CellState = 'correct' | 'present' | 'absent';

type LetterState = {
  letter: string;
  state: CellState;
};

function evaluateGuess(guess: string, target: string): LetterState[] {
  const guessChars = guess.split('');
  const targetChars = target.split('');
  const result: LetterState[] = guessChars.map((letter) => ({ letter, state: 'absent' }));

  const remaining = new Map<string, number>();

  for (let index = 0; index < targetChars.length; index += 1) {
    if (guessChars[index] === targetChars[index]) {
      result[index].state = 'correct';
    } else {
      const currentCount = remaining.get(targetChars[index]) ?? 0;
      remaining.set(targetChars[index], currentCount + 1);
    }
  }

  for (let index = 0; index < guessChars.length; index += 1) {
    if (result[index].state === 'correct') continue;

    const available = remaining.get(guessChars[index]) ?? 0;
    if (available > 0) {
      result[index].state = 'present';
      remaining.set(guessChars[index], available - 1);
    }
  }

  return result;
}

function normalizeWord(word: string): string {
  return word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase();
}

const MAX_ATTEMPTS = 6;
const KEYBOARD_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

function getLetterPriority(state: CellState): number {
  if (state === 'correct') return 3;
  if (state === 'present') return 2;
  return 1;
}

export default function GameSection() {
  const { t } = useLanguage();
  const [level, setLevel] = useState(0);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [status, setStatus] = useState<'playing' | 'won-level' | 'lost-level' | 'completed'>('playing');
  const [message, setMessage] = useState('');

  const words = useMemo(() => t.game.words.map(normalizeWord), [t.game.words]);
  const currentTarget = words[level] ?? '';

  useEffect(() => {
    if (status !== 'completed') return;

    const fire = () => {
      confetti({ particleCount: 120, spread: 75, origin: { y: 0.65 } });
      confetti({ particleCount: 90, spread: 110, origin: { x: 0.2, y: 0.7 } });
      confetti({ particleCount: 90, spread: 110, origin: { x: 0.8, y: 0.7 } });
    };

    fire();
    const timeout = setTimeout(fire, 350);
    return () => clearTimeout(timeout);
  }, [status]);

  useEffect(() => {
    setCurrentGuess('');
    setAttempts([]);
    setStatus('playing');
    setMessage('');
  }, [level]);

  const submitGuess = () => {
    if (status === 'completed') return;

    if (!currentTarget) return;

    const normalizedGuess = normalizeWord(currentGuess);

    if (normalizedGuess.length !== currentTarget.length) {
      setMessage(t.game.messages.invalidLength.replace('{length}', String(currentTarget.length)));
      return;
    }

    const newAttempts = [...attempts, normalizedGuess];
    setAttempts(newAttempts);
    setCurrentGuess('');
    setMessage('');

    if (normalizedGuess === currentTarget) {
      const isLastLevel = level === words.length - 1;
      if (isLastLevel) {
        setStatus('completed');
        setMessage(t.game.messages.completed);
      } else {
        setStatus('won-level');
        setMessage(t.game.messages.levelWon.replace('{level}', String(level + 1)));
      }
      return;
    }

    if (newAttempts.length >= MAX_ATTEMPTS) {
      setStatus('lost-level');
      setMessage(t.game.messages.levelLost.replace('{word}', currentTarget));
    }
  };

  const goNextLevel = () => {
    if (level < words.length - 1) {
      setLevel((prev) => prev + 1);
    }
  };

  const retryLevel = () => {
    setAttempts([]);
    setCurrentGuess('');
    setStatus('playing');
    setMessage('');
  };

  const renderedAttempts = Array.from({ length: MAX_ATTEMPTS }, (_, rowIndex) => {
    const guess = attempts[rowIndex];
    const row = guess ? evaluateGuess(guess, currentTarget) : null;

    return (
      <div key={rowIndex} className="flex justify-center gap-1.5 sm:gap-2 min-w-max">
        {Array.from({ length: currentTarget.length }, (_, colIndex) => {
          const cell = row?.[colIndex];
          const letter = cell?.letter ?? '';
          const state = cell?.state;

          const base = 'h-10 w-9 sm:h-11 sm:w-10 md:h-12 md:w-11 flex items-center justify-center border text-xs sm:text-sm md:text-base font-mono tracking-wider';
          const style = state === 'correct'
            ? 'bg-green-900 text-cream border-green-800'
            : state === 'present'
              ? 'bg-accent text-cream border-accent'
              : state === 'absent'
                ? 'bg-noir text-cream-dim border-noir-border'
                : 'bg-noir-surface text-cream border-noir-border';

          return (
            <div key={colIndex} className={`${base} ${style}`}>
              {letter}
            </div>
          );
        })}
      </div>
    );
  });

  const keyboardState = useMemo(() => {
    const stateMap = new Map<string, CellState>();

    attempts.forEach((guess) => {
      const evaluated = evaluateGuess(guess, currentTarget);

      evaluated.forEach((entry) => {
        const previous = stateMap.get(entry.letter);
        if (!previous || getLetterPriority(entry.state) > getLetterPriority(previous)) {
          stateMap.set(entry.letter, entry.state);
        }
      });
    });

    return stateMap;
  }, [attempts, currentTarget]);

  const remainingAttempts = MAX_ATTEMPTS - attempts.length;
  const showHint = status === 'playing' && remainingAttempts === 2;
  const hintText = t.game.hints[level] ?? '';

  return (
    <section id="game" className="py-20 md:py-28 lg:py-40 bg-noir-light" aria-label={t.game.title}>
      <div className="container-editorial">
        <div className="mb-12 md:mb-14">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent">
            {t.game.label}
          </span>

          <div className="mt-4 mb-6 h-px bg-noir-border w-12" aria-hidden="true" />

          <h2 id="game-heading" className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-cream leading-tight">
            {t.game.title}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-4"
        >
          <p className="text-cream text-base md:text-lg max-w-3xl">{t.game.brief}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10"
        >
          <p className="text-cream-dim text-base md:text-lg max-w-3xl">{t.game.subtitle}</p>
        </motion.div>

        <div className="border border-noir-border bg-noir-surface/70 p-4 sm:p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-cream-muted">
              {t.game.levelLabel} {level + 1} / {words.length}
            </p>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent">
              {t.game.wordLengthLabel}: {currentTarget.length}
            </p>
          </div>

          <div className="space-y-2 mb-6 overflow-x-auto pb-1">{renderedAttempts}</div>

          {showHint && (
            <div className="mb-6 border border-accent/40 bg-noir px-4 py-3">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent mb-1">
                {t.game.hintLabel}
              </p>
              <p className="text-cream-dim text-sm">{hintText}</p>
            </div>
          )}

          <div className="mb-6">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-cream-muted mb-3">
              {t.game.keyboardLabel}
            </p>
            <div className="space-y-2">
              {KEYBOARD_ROWS.map((row) => (
                <div key={row} className="flex justify-center gap-1.5 sm:gap-2">
                  {row.split('').map((letter) => {
                    const state = keyboardState.get(letter);
                    const keyStyle = state === 'correct'
                      ? 'bg-green-900 border-green-800 text-cream'
                      : state === 'present'
                        ? 'bg-accent border-accent text-cream'
                        : state === 'absent'
                          ? 'bg-noir border-noir-border text-cream-muted'
                          : 'bg-noir-surface border-noir-border text-cream';

                    return (
                      <div
                        key={letter}
                        className={`h-8 w-7 sm:h-9 sm:w-8 md:h-10 md:w-9 flex items-center justify-center border font-mono text-[10px] sm:text-xs tracking-wider ${keyStyle}`}
                      >
                        {letter}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {status !== 'completed' && (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={currentGuess}
                onChange={(event) => setCurrentGuess(normalizeWord(event.target.value))}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') submitGuess();
                }}
                maxLength={currentTarget.length}
                className="w-full sm:flex-1 bg-noir border border-noir-border px-4 py-3 text-cream font-mono text-sm tracking-wider uppercase focus:outline-none focus:border-accent"
                placeholder={t.game.inputPlaceholder.replace('{length}', String(currentTarget.length))}
                aria-label={t.game.inputAriaLabel}
              />

              <button
                onClick={submitGuess}
                className="w-full sm:w-auto font-mono text-xs tracking-wider uppercase bg-cream text-noir px-5 py-3 hover:bg-accent hover:text-cream transition-colors duration-300"
              >
                {t.game.submit}
              </button>
            </div>
          )}

          {message && (
            <p className="mt-4 font-mono text-xs sm:text-sm text-cream-dim">{message}</p>
          )}

          {status === 'won-level' && (
            <button
              onClick={goNextLevel}
              className="mt-4 font-mono text-xs tracking-wider uppercase bg-accent text-cream px-5 py-3 hover:bg-accent-hover transition-colors duration-300"
            >
              {t.game.nextLevel}
            </button>
          )}

          {status === 'lost-level' && (
            <button
              onClick={retryLevel}
              className="mt-4 font-mono text-xs tracking-wider uppercase border border-noir-border text-cream px-5 py-3 hover:border-cream-muted transition-colors duration-300"
            >
              {t.game.retry}
            </button>
          )}

          {status === 'completed' && (
            <div className="mt-5 border border-accent/40 bg-noir p-4 sm:p-5">
              <p className="font-serif italic text-2xl sm:text-3xl text-cream">{t.game.congratsTitle}</p>
              <p className="mt-2 text-cream-dim">{t.game.congratsBody}</p>
              <a
                href="#contact"
                className="inline-flex mt-4 font-mono text-xs tracking-wider uppercase bg-accent text-cream px-5 py-3 hover:bg-accent-hover transition-colors duration-300"
              >
                {t.game.contactCta}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
