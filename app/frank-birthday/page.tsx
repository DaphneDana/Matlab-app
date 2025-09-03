'use client';

import { useState } from 'react';
import styles from './frank-birthday.module.css';

export default function FrankBirthdayPage() {
  const [surpriseShown, setSurpriseShown] = useState(false);

  const createConfetti = () => {
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = styles.confetti;
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  };

  const createEmojiRain = () => {
    const emojis = ['🎂', '🎉', '🎈', '🎊', '🍰', '🎁', '🥳', '✨'];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const emoji = document.createElement('div');
        emoji.className = styles.emojiRain;
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(emoji);
        
        setTimeout(() => {
          emoji.remove();
        }, 4000);
      }, i * 200);
    }
  };

  const showSurprise = () => {
    setSurpriseShown(true);
    createConfetti();
    createEmojiRain();
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>🎂 HAPPY BIRTHDAY 🎂</h1>
        <div className={styles.frankName}>FRANK!</div>
        
        <div className={styles.funnyMessage}>
          🎉 Congratulations Frank! You&apos;ve successfully completed another year of being absolutely awesome! 🎉
          <br /><br />
          Today we celebrate the legendary Frank - the person who makes every day brighter and every joke funnier! 
        </div>

        <div className={styles.ageJoke}>
          &quot;Age is just a number... but in your case, it&apos;s a really good number! 
          You&apos;re like fine wine, cheese, or that one meme that never gets old!&quot; 🍷🧀😂
        </div>

        <div className={styles.birthdayFacts}>
          <h3>🎯 Fun Frank Birthday Facts:</h3>
          <ul>
            <li>🎈 Frank&apos;s birthday is scientifically proven to make the world 23% more fun</li>
            <li>🎪 Studies show that Frank&apos;s smile can power a small village for a week</li>
            <li>🚀 NASA is considering using Frank&apos;s awesomeness as rocket fuel</li>
            <li>🏆 Frank holds the unofficial world record for &quot;Most Likely to Make People Laugh&quot;</li>
            <li>🎭 Frank&apos;s birthday is so epic, even calendars get excited when it approaches</li>
          </ul>
        </div>

        <button 
          className={`${styles.cakeButton} ${surpriseShown ? styles.surpriseButton : ''}`}
          onClick={showSurprise}
        >
          {surpriseShown ? '🎊 HAPPY BIRTHDAY FRANK! 🎊' : '🎂 Click for Birthday Magic! 🎂'}
        </button>
        
        {surpriseShown && (
          <div className={styles.hiddenSurprise}>
            🎊 SURPRISE! Frank, you&apos;re not just getting older, you&apos;re getting BETTER! 
            Here&apos;s to another year of bad jokes, good times, and being the amazing person you are! 🎊
          </div>
        )}

        <div className={styles.footer}>
          Made with ❤️ and lots of birthday joy for the one and only Frank!
          <br />
          🎈 May your day be filled with cake, laughter, and zero calories! 🎈
        </div>
      </div>
    </div>
  );
}