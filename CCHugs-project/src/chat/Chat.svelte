<script>
  import { auth, firestore } from '../Firebase.js';
  import { authState } from 'rxfire/auth';
  import { onMount } from 'svelte';

  import Navbar from '../components/Navbar.svelte'
  import Sidebar from './sidebar/Sidebar.svelte';
  import Content from './main/Content.svelte';

  export let uid;

  let userIDsPromise = getAllUsersDB();
  let activeChatIndex = 1;

  async function getAllUsersDB() {
    const query = firestore
      .collection('Conversations')
      .where('participants', 'array-contains', uid);
    
    const querySnapshot = await query.get();

    let participantsFromDB = await querySnapshot.docs.flatMap(doc => doc.get('participants'));

    return participantsFromDB.filter(p => p !== uid);
  }

  function updateActive(event) {
    activeChatIndex = event.detail;
  }

</script>

<main>
  <Navbar />
  {#await userIDsPromise then userIDs}
    <Sidebar {userIDs} {activeChatIndex} on:updateActive={updateActive}/>
    <Content {userIDs} {uid} partnerIndex={activeChatIndex}/>
  {/await}
</main>


<style>
  main {
    display: grid;
    grid-template-rows: 10vh auto;
    grid-template-columns: 25vw auto;
    width: 100vw;
    height: 100vh;
    margin: 0px;
    padding: 0px;
  }
</style>