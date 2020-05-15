<script>
import Navbar from '../components/Navbar.svelte';
import Footer from '../components/Footer.svelte';
import { auth, firestore } from '../Firebase.js';
import { authState } from 'rxfire/auth';
import { collectionData } from 'rxfire/firestore';

export let uid;

let src = "../DifferentLogo2.svg";

let count = 0; 

let hugPromise = getHugs();

async function getHugs() {
    let snapshot = await firestore.collection('Hugs').where("receiver", "==", uid)
        .get();
        console.log(snapshot.docs);
        return snapshot.docs.map(doc => doc.data());    
}

function showProfile() {
  auth.onAuthStateChanged(function (user) {
		  firestore.collection("Users").doc(user.uid)
		  .onSnapshot(function (snap) {
			  let userName = snap.data().displayName;
			  document.getElementById("dname").innerHTML= userName;
		  })
  });
}
showProfile(); 
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
h3 {
    margin: 10px;
    padding: 10px;
    text-align: center;
}
 #hugs-list {
    padding: 0px;
    margin-bottom: 50px;
    
}
p { 
    margin: 15px 0px; 
    padding: 10px; 
    background-image: linear-gradient(135deg, #6DFFE7, #ffffff); 
    border-radius: 25px; 
    border: 2px solid black;
}

  /** tablet*/
  @media (max-width: 1024px) {
    main{
    margin: 0% 10%;
    font-size:3vw;
    }
  }

  @media (max-width:440px)  {
    main{
        margin: 0% 5%;     
        font-size:4vw;
   
    }
  }

</style>


<header>
    <img {src} alt="logo" id="logo">
</header>

<Navbar />
          
<main>
    <h3><span id="dname"></span>'s <br>Recieved Hugs</h3>

        <div id="hugs-list">
            {#await hugPromise then hugReceived}
                {#each hugReceived as hugs, i}
                <!-- <div>{i + 1} {i === 0 ? 'hug' : 'hugs'} recieved<br> -->
                    <p>
                        <b>From: </b>{hugs.author}<br>
                        <b>Message: </b>{hugs.content}<br>
                        <b>Time: </b>{hugs.time.toDate()} 
                    </p>
                <!-- </div> -->
                {/each}
            {/await}               
        </div>
</main> 

<Footer />