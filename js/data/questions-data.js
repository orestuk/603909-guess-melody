import sampleMelodies from './sample-data';

class ArtistQuestion {
  constructor(questionText, melodySrc, answers) {
    this.text = questionText;
    this.type = `artist`;
    this.melody = melodySrc;
    this.answers = answers;
  }
}

class ArtistAnswer {
  constructor(title, image, isCorrect) {
    this.title = title;
    this.image = image;
    this.isCorrect = isCorrect;
  }
}

class GenreQuestion {
  constructor(questionText, genre, answers) {
    this.text = questionText;
    this.type = `genre`;
    this.genre = genre;
    this.answers = answers;
  }
}

class GenreAnswer {
  constructor(melody, genre) {
    this.melody = melody;
    this.genre = genre;
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = (array) => {
  return array.sort(() => 0.5 - Math.random());
};

const getArtistIndexes = () => {
  const names = [];
  let melodiesIndexes = [];
  sampleMelodies.forEach((item, pos) => {
    if (names.indexOf(item.artist) === -1) {
      names.push(item.artist);
      melodiesIndexes.push(pos);
    }
  });
  return melodiesIndexes;
};

const getGenreIndexes = () => {
  return [...sampleMelodies.keys()];
};

const getRandomMelodies = (quantity, melodiesIndexes) => {
  const results = [];
  for (let i = 0; i < quantity; i++) {
    const index = melodiesIndexes[getRandomInt(0, melodiesIndexes.length - 1)];
    melodiesIndexes = melodiesIndexes.filter((item) => item !== index);
    results.push(sampleMelodies[index]);
  }
  return results;
};

const generateArtistQuestion = () => {
  const randomMelodies = getRandomMelodies(3, getArtistIndexes());
  const randomAnswers = [];
  let randomMelody = randomMelodies[0];
  const melody = randomMelody.src;
  randomAnswers.push(new ArtistAnswer(randomMelody.artist, randomMelody.image, true));
  for (let i = 0; i < 2; i++) {
    randomMelody = randomMelodies[i + 1];
    randomAnswers.push(new ArtistAnswer(randomMelody.artist, randomMelody.image, false));
  }
  return new ArtistQuestion(`Кто исполняет єту песню?`, melody, shuffleArray(randomAnswers));
};

const generateGenreQuestion = () => {
  const randomMelodies = getRandomMelodies(4, getGenreIndexes());
  const randomAnswers = randomMelodies.map((item) => new GenreAnswer(item.src, item.genre));
  return new GenreQuestion(`Выберите ${randomMelodies[0].genre} треки`, randomMelodies[0].genre, shuffleArray(randomAnswers));
};

export const generateQuestion = () => getRandomInt(0, 1) ? generateArtistQuestion() : generateGenreQuestion();
