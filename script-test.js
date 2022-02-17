const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
  button.disabled = !button.disabled;
}

function tellMe(joke) {
  console.log('tell me ', joke);
  VoiceRSS.speech({
    key: '9514a101745d4affbe2f6dd8045485ac',
    src: `${joke}`,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

async function getJokes() {
  let joke = '';
  const apiURL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = `${data.joke}`;
    }
    // test to speech
    tellMe(joke);
    // disable button
    toggleButton();
  } catch (err) {
    // catch error
    console.log('failed ', err);
  }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
