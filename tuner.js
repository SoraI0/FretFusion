import autoCorrelate from "./autocorrelate.js";



  const audioCtx = new window.AudioContext();
  const freqDisplay = document.querySelectorAll('#freq .playing-note')
  const scale = document.querySelectorAll('.tuner__scale-point')
  console.log(scale.length);
  let analyserNode = audioCtx.createAnalyser();
  
  
  const noteStrings = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  
  function getNoteFromPitchFrequency(freq) {
    return Math.round(12 * (Math.log(freq / 440) / Math.log(2))) + 69;
  }
  
  function getPitchFrequencyFromNote(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
  }
  
  function centsOffPitch(frequencyPlayed, correctFrequency) {
    return Math.floor(
      (1200 * Math.log(frequencyPlayed / correctFrequency)) / Math.log(2)
    );
  }
  
  async function setupMic() {
    const mic = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    return mic;
  }
  
  async function start() {
    const buffer = new Float32Array(analyserNode.fftSize);
    const mediaStream = await setupMic();
    const mediaSource = audioCtx.createMediaStreamSource(mediaStream);
    mediaSource.connect(analyserNode);
    analyserNode.getFloatTimeDomainData(buffer);
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    

    function getSoundData() {
      analyserNode.getFloatTimeDomainData(buffer);
      const frequency = autoCorrelate(buffer, audioCtx.sampleRate);
      freqDisplay.textContent = frequency.toFixed(0)
      let nName
      if (frequency > -1) {
        const midiPitch = getNoteFromPitchFrequency(frequency);
        const playingNote = noteStrings[midiPitch % 12];
        const needNote = document.querySelector('.play-section__chord')
        nName = playingNote;
        console.log(nName);
        document
          .getElementById("playing-note")
          .replaceChildren(document.createTextNode(playingNote));

          if (playingNote === needNote.textContent) {
            setTimeout(()=>{
              needNote.style.color = 'green'
              setTimeout(()=>{
                needNote.style.color = 'white'
                needNote.textContent = 'F'
              }, 1000)
            }, 1000)
            
            
          }
      } 
    }
    
    setInterval(getSoundData, 10);

  }
start()