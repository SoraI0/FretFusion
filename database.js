
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyD504MXz-uzsfI_r7SlLeTMAkVreJBWl_M",
  authDomain: "fretfusion-b00dd.firebaseapp.com",
  projectId: "fretfusion-b00dd",
  storageBucket: "fretfusion-b00dd.appspot.com",
  messagingSenderId: "902263446279",
  appId: "1:902263446279:web:422ff92221736e90c643a2"
};

const app = initializeApp(firebaseConfig);
import {getDatabase, ref, child, get, set, update, remove} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebase = getDatabase();

let songName = document.querySelector('#songName')
let chordInput = document.querySelector('#chordInput')
let textInput = document.querySelector('#textInput')
let nextInput = document.querySelector('#nextInput')
let endInput = document.querySelector('#endInput')
let rowCount = 1 

function addData() {
    set(ref(firebase, 'Songs/'+ songName.value + '/' + rowCount), {
        chord: chordInput.value,
        text: textInput.value
    }).then(()=>{
        console.log('Успішно збережено');
        rowCount++
        chordInput.value = ''
        textInput.value = ''
    }).catch(()=>{
        alert('Не збережено')
        console.log('error');
    })
}





// nextInput.addEventListener('click', addData)
    
// function updateData() {
//     update(ref(firebase, songName + chordInput.value), {
//         chord: textInput
//     }).then(()=>{
//         alert('Успішно онолено')
//     }).catch(()=>{
//         alert('Не оновлено')
//         console.log('error');
//     })
// }

// function deleteData() {
//     remove(ref(firebase, songName + chordInput.value), {
//         chord: textInput
//     }).then(()=>{
//         alert('Успішно збережено')
//     }).catch(()=>{
//         alert('Не збережено')
//         console.log('error');
//     })
// }

// function retData() {
//     const firebaseRef = ref(firebase)
//     get(child(firebaseRef, 'Songs'+ songName.value + '/' + rowCount)).then((snapshot)=>{
//         if(snapshot.exists()) {
//             chordInput.value = snapshot.val().chord
//             textInput.value = snapshot.val().text
//         }
//         else {
//             alert('ти лох')
//         }
//     }).catch(()=>{
//         alert('Не виконано')
//         console.log('error');
//     })
// }



export async function rowData(row) {
    const firebaseRef = ref(firebase)

    let chord = await get(child(firebaseRef, 'Songs/Володимир Івасюк - Пісня буде поміж нас/' + row + '/chord'))

    let text = await get(child(firebaseRef, 'Songs/Володимир Івасюк - Пісня буде поміж нас/' + row + '/text'))
    row++
    return [chord.val(), text.val()]
}


// rowData().then((data)=> {
//     console.log(data);
// })






// const songList = document.querySelectorAll('.song')
// console.log(songList); 


