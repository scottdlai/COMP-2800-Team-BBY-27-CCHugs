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
// let userPromise = getUser();


async function getHugs() {
    let snapshot = await firestore.collection('Hugs').where("receiver", "==", uid)
        .get();
        console.log(snapshot.docs);

        return snapshot.docs.map(doc => doc.data());
    
}


// async function getHugs() {
//     let snapshot = await firestore.collection('Hugs').where("receiver", "==", uid)
//         .get();
//         console.log(snapshot.docs);

//         return snapshot.docs.map(doc => doc.data());
    
// }



//   async function getUser() {
//     const query = firestore.collection('Users').doc();

//     const userDoc = await query.get();

//     return {
//       username: userDoc.get('username'),
//       id: userDoc.id
//     };
//   }

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
h1 {
    margin: 10px;
    padding: 10px;
    text-align: center;
}
ul {
    list-style: none;
    padding: 0px;
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
    <img {src} alt="logo" id="logo">
</header>

<Navbar />
          
<main>
    <h1>Hugs Received</h1>
    <h3>You've recieved <b>{count}</b> {count === 1 ? 'hug' : 'hugs'}!</h3>


<!-- {#await userPromise then user} -->
    {#if uid}
    <h6><span id="dname"></span> logged in!</h6>
    {/if}
<!-- {/await} -->





        <ul id="hugs-list">
            {#await hugPromise then hugReceived}
                {#each hugReceived as hugs}
                <p> Hug Recieved!<br>
                <b>From: </b>{hugs.author}<br>
                <b>Message: </b>{hugs.content}<br>
                <b>Time: </b>{hugs.time.toDate()} 
                </p>
                {/each}
            {/await}               
        </ul>
    <div>  

</main> 

<Footer />