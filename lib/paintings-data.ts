import { Painting } from './types';

export const paintings: Painting[] = [
  {
    id: '1',
    title: 'Mona Lisa',
    description: 'The enigmatic portrait of Lisa Gherardini, wife of a Florentine merchant, painted by Leonardo da Vinci during the Italian Renaissance. Her mysterious smile and penetrating gaze have captivated viewers for centuries. The artist\'s mastery of sfumato—a technique of subtle gradations of light and shadow—creates an almost ethereal quality. The landscape behind her adds depth and mystery, while her pose demonstrates Leonardo\'s understanding of human anatomy and expression, making this one of the most famous and enigmatic paintings in the world.',
    imageUrl: '/paintings/monalisa.png',
    soundUrl: '/sounds/monalisa.mp3',
    year: '1503-1519',
    artist: 'Leonardo da Vinci',
  },
  {
    id: '2',
    title: 'Starry Night',
    description: 'A swirling night sky over the French village of Saint-Rémy-de-Provence, painted from memory during the day while Van Gogh was in an asylum. The dynamic sky pulses with energy, featuring bold brushstrokes that create movement and rhythm. A dark cypress tree in the foreground reaches upward like a flame toward the rolling celestial dance above. The painting represents both turbulent emotion and profound beauty, capturing the artist\'s unique vision of the cosmos and his connection to nature during a period of great personal struggle.',
    imageUrl: '/paintings/stary-night.webp',
    soundUrl: '/sounds/stary-night.mp3',
    year: '1889',
    artist: 'Vincent van Gogh',
  },
];
