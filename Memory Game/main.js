document.querySelector(".button-container span").onclick = function () {
    let yourName = prompt("Whats Your Name");

    if (yourName == null || yourName == "") {
        document.querySelector(".info-container .name span").innerHTML = "Unkown"
    } else {
        document.querySelector(".info-container .name span").innerHTML = yourName
    }
    document.querySelector(".button-container").remove();

    let time = document.querySelector(".time");
    setInterval(() => {
    if (time.innerHTML > 30) {
        time.innerHTML--
    } else if (time.innerHTML > 10) {
        time.style.backgroundColor = "green"
        time.innerHTML--
    } else if (time.innerHTML > 0) {
        time.innerHTML--
        time.style.backgroundColor = "red"
        playSound()
    } else {
        location.reload();
    }
}, 1000)

    startSound()
}


let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);


let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange)

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener("click", () => {
        flipBlock(block);
    })
})

function flipBlock(selectedBlock) {
    selectedBlock.classList.add("is-flipped");

    let allFlipBlocks = blocks.filter(block => block.classList.contains("is-flipped"));

        if (allFlipBlocks.length == 2) {
            
            stopClicking();

            checkMatchBlocks(allFlipBlocks[0], allFlipBlocks[1]);

        }
}

function stopClicking() {

    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {

        blocksContainer.classList.remove("no-clicking");
        
    }, duration);
}

function checkMatchBlocks(fristBlock, secondBlock) {

    let wrong = document.querySelector(".tries span");

    if (fristBlock.dataset.technology === secondBlock.dataset.technology) {

        fristBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        fristBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        successSound()
    } else {

        wrong.innerHTML = parseInt(wrong.innerHTML) + 1;

        setTimeout(() => {
            
            fristBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");


        }, duration);
        failSound()
    }
}
function shuffle(array) {

    let current = array.length,
        temp,
        random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
        
    }
    
    return array    
}

// By Ai
function successSound() {
  const audio = new AudioContext();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  oscillator.frequency.value = 800;
  oscillator.type = "sine";

  oscillator.connect(gain);
  gain.connect(audio.destination);

  oscillator.start();

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audio.currentTime + 0.3
  );

  oscillator.stop(audio.currentTime + 0.3);
}

function failSound() {
  const audio = new AudioContext();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  oscillator.frequency.value = 200;
  oscillator.type = "sawtooth";

  oscillator.connect(gain);
  gain.connect(audio.destination);

  oscillator.start();

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audio.currentTime + 0.5
  );

  oscillator.stop(audio.currentTime + 0.5);
}

function startSound() {
  let audio = new AudioContext();
  let oscillator = audio.createOscillator();
  let gain = audio.createGain();

  oscillator.frequency.value = 600;
  oscillator.type = "sine";

  oscillator.connect(gain);
  gain.connect(audio.destination);

  gain.gain.value = 0.2;

  oscillator.start();

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audio.currentTime + 0.5
  );

  oscillator.stop(audio.currentTime + 0.5);
}

function playSound() {
  let audio = new AudioContext();
  let oscillator = audio.createOscillator();
  let gain = audio.createGain();

  oscillator.frequency.value = 800;
  oscillator.type = "sine";

  oscillator.connect(gain);
  gain.connect(audio.destination);

  gain.gain.value = 0.2;

  oscillator.start();

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audio.currentTime + 0.15
  );

  oscillator.stop(audio.currentTime + 0.15);
}