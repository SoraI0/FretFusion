const btn = document.querySelector('.metronome__start')
const bpm = document.querySelector('.metronome__bpm-range')


var current_player = "a"
var player_a = new Audio('./sounds/click.mp3')
var player_b = new Audio('./sounds/click.mp3')

player_a.src = "./sounds/click.mp3"
player_b.src = player_a.src

function loopIt(){
    var player = null

    if(current_player == "a"){
        player = player_b
        current_player = "b"
    }
    else{
        player = player_a
        current_player = "a"
    }

    player.play()

    setTimeout(loopIt, 60000 / bpm.value)
}



player_a.muted = true
player_b.muted = true
loopIt()

btn.addEventListener('click', function() {

    if (btn.id === 'play') {
        player_a.muted = true
        player_b.muted = true
        btn.id = 'stop'
        breake
    }
    
    if(btn.id === 'stop') {
        player_a.muted = false
        player_b.muted = false
        btn.id = 'play'
    }
})


const bpmNum = document.querySelector('.metronome__bpm-num')

bpm.addEventListener('click', function() {
    bpmNum.textContent = bpm.value
})


const btns = document.querySelectorAll('.metronome__beats-choice')

btns[0].addEventListener('click', function() {
    bpmNum.textContent = +bpmNum.textContent - 1
    bpm.value = bpmNum.textContent
})

btns[1].addEventListener('click', function() {
    bpmNum.textContent = +bpmNum.textContent + 1
    bpm.value = bpmNum.textContent
})
