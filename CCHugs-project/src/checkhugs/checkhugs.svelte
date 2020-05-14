<script>
import Navbar from '../components/Navbar.svelte';
import Footer from '../components/Footer.svelte';
import { auth, firestore } from '../Firebase.js';

let src = "../DifferentLogo2.svg";

let count = 0;

//create element and render hugs
function renderHug(doc){

    let hugList = document.getElementById('hugs-list');

    let div = document.createElement('div')
    let li = document.createElement('li');
    let author = document.createElement('span');
    let content = document.createElement('span');
    let time = document.createElement('span');
    
    let sheet = document.createElement('style')
    sheet.innerHTML = "li { margin: 15px 0px; padding: 10px; background-image: linear-gradient(135deg, #6DFFE7, #ffffff); border-radius: 25px; border: 2px solid black;}";
    document.body.appendChild(sheet);

    div.classList.add('backgroundContainer');

    li.setAttribute('data-id', doc.id);
    author = doc.data().author;
    content = doc.data().content;
    time = doc.data().time.toDate();

    let author1 = document.createTextNode(`<b>From: </b>`  + author);
    let content1 = document.createTextNode("Message: " + content);
    let time1 = document.createTextNode("Time: " + time);

    li.appendChild(author1);
    li.appendChild(document.createElement('br'));
    li.appendChild(content1);
    li.appendChild(document.createElement('br'));
    li.appendChild(time1);
    li.appendChild(document.createElement('br'));
    div.appendChild(li)
    hugList.appendChild(div);
}

firestore.collection('Hugs').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderHug(doc);
        count += 1;
    })
})
</script>


<style>

header {
    overflow: hidden;
    text-align: center;
    background-color: #ffe66d;
    position: relative;
    top: 0;
    width: 100%;
}

#logo {
    width: 80%;
}

main {
    margin: 0% 20%;
}

h1 {
    margin: 10px;
    padding: 10px;
    text-align: center;
}

ul {
    list-style: none;
    padding: 0px;
}

  /** tablet*/
  @media (max-width: 1024px) {
    main{
    /* padding: 50px 100px; */
    margin: 0% 10%;
    }
  }

  @media (max-width:440px)  {
    main{
        margin: 0% 5%;
        
    }
  }

</style>

<header>
    <img {src} alt=logo id="logo">
</header>

<Navbar />

<main>
    <h1>Hugs Received</h1>
    <h3>You've recieved <b>{count}</b> {count === 1 ? 'hug' : 'hugs'}!</h3>
    <div>
        <ul id="hugs-list"></ul>
    <div>  

</main>

<Footer />