<script>
  import { auth, firestore } from '../Firebase.js';
  import { authState } from 'rxfire/auth';
  import { onMount } from 'svelte';

  import Navbar from '../components/Navbar.svelte'
  import Sidebar from './sidebar/Sidebar.svelte';
  import Content from './main/Content.svelte';

  export let uid;

  let userIDsPromise = getAllUsersDB();
  let partnerIndex = 0;

  async function getAllUsersDB() {
    // console.log(uid);
    const query = firestore
      .collection('Conversations')
      .where('participants', 'array-contains', uid);
    
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      throw new Error('querySnapshot is empty!');
    }

    let participantsFromDB = querySnapshot.docs.flatMap(doc => doc.get('participants'));

    return participantsFromDB.filter(p => p !== uid);
  }

  function updateActive(event) {
    partnerIndex = event.detail;
  }

  function goToFriendPage() {
    location.href = '/friends';
  }

</script>

<Navbar />
  {#await userIDsPromise then userIDs}
    <main>
      <Sidebar {userIDs} {partnerIndex} on:updateActive={updateActive}/>
      <Content {userIDs} {uid} {partnerIndex}/>
    </main>
  {:catch error}
    <main class="container-friends">
      <h1>Start new conversations with your friends!</h1>
      <button on:click={goToFriendPage}>Go</button>
    </main>
  {/await}


<style>
  main {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 25vw auto;
    width: 100vw;
    height: 85vh;
    margin: 0px;
    padding: 0px;
  }

  .container-friends {
    display: flex !important;
    flex-direction: column;
    align-items: center;
  }

  button {
    background-color: #ffe66d;
    width: 60vw;
    height: 15vh;
    border: none;
    border-radius: 4px;
    font-size: 2em;
    outline: none;
    cursor: pointer;
  }

  button:hover {
    border: 4px solid black;
  }
</style>