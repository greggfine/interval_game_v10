$(document).ready(function() {

"use strict";

var count;

function init() {
  count = 0;
  $('#good').text(count);
}

init();


const randomIntButton = document.getElementById('randomIntButton');
const frequency = document.getElementById('frequency');
const frequencyMap = {
  c3: 130.81,
  d3: 146.83,
  e3: 164.81,
  f3: 174.61,
  g3: 196.00,
  a3: 220.00,
  b3: 246.94,
  c4: 261.63,
  d4: 293.66,
  e4: 329.63,
  f4: 349.23,
  g4: 392.00,
  a4: 440.00,
  b4: 493.88,
  c5: 523.25,
}
var answer1 = document.getElementById('answer1');
var answer2 = document.getElementById('answer2');
var answer3 = document.getElementById('answer3');
var answer4 = document.getElementById('answer4');
var answer5 = document.getElementById('answer5');
var answer6 = document.getElementById('answer6');




class Sound {

  constructor(context, oscType, level) {
    this.context = context;
    this.oscType = oscType;
    this.level = level;
  }

  init() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = this.oscType;
  }

  play(value, time) {
    this.init();

    this.oscillator.frequency.value = value;
    this.gainNode.gain.value = this.level;
    // this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
            
    this.oscillator.start(time);
    this.stop(time);

  }

  stop(time) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.100, time + 1);
    this.oscillator.stop(time + 1);
  }
}

let context = new (window.AudioContext || window.webkitAudioContext)();
let oscType;

$('#sine').on('click', function() {
  oscType = "sine";
});
$('#square').on('click', function() {
  oscType = "square";
});
$('#triangle').on('click', function() {
  oscType = "triangle";
});
$('#sawtooth').on('click', function() {
  oscType = "sawtooth";
});

let level = .6;

$('#test-slider').on('change', function(e) {
    level = e.target.value/20;
})

  


randomIntButton.addEventListener('click', function() {
  //.spanTest: span in button to display note name
  //This resets the backgroundColor to 'none'
      $('.spanTest').css('backgroundColor', '#eee');
      // $('.spanTest').removeClass('redButton');
  //This resets the text of <p>#correct to 'none'
      $('#correct').text('');


  //New Web Audio API sound is created
      let note = new Sound(context, oscType, level);
      let now = context.currentTime;

  //'Answer' is a random frequency value from frequencyMap Object
      let answer = _.sample(frequencyMap, 1);
      let answerNote = (_.invert(frequencyMap))[answer]; 


  //Interval is played: from c4 to randomly selected note
      note.play(frequencyMap.c4, now);
      note.play(answer, now + 1);

                      //  BUTTON BOX
      var answerArr = [answer1, answer2, answer3, answer4, answer5, answer6];


      function generateUniqueFreq() {
            const uniqueFreqs = [answerNote];

            while(uniqueFreqs.length < 6) {
                   let randomFreq = _.sample(frequencyMap, 1);
                   let noteName = (_.invert(frequencyMap))[randomFreq];
                   if(!uniqueFreqs.includes(noteName)) {
                     uniqueFreqs.push(noteName);
                   }
            }

           let shuffledArr = _.shuffle(uniqueFreqs);
           // console.log(uniqueFreqs)

           for(var i = 0; i < answerArr.length; i++) {
              answerArr[i].textContent = shuffledArr[i]
           }

      }

      generateUniqueFreq();



      $('.spanTest').on('click', function(){
 
        if ($(this)[0].textContent === answerNote) {
             incrementCounter();
             $(this).css('backgroundColor', 'lightGreen');
             $('#correct').text('Correct!').css('backgroundColor', 'lightGreen');
             
           
        } else {
            $(this).css('backgroundColor', 'red');
            $('#correct').text('Wrong!').css('backgroundColor', 'red');
        }
     });



  })

     function incrementCounter() {
        $('#good').text(++count);
      }


}());
