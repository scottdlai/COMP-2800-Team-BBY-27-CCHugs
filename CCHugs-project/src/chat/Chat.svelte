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
    const query = firestore
      .collection('Conversations')
      .where('participants', 'array-contains', uid);
    
    const querySnapshot = await query.get();

    let participantsFromDB = querySnapshot.docs.flatMap(doc => doc.get('participants'));

    return participantsFromDB.filter(p => p !== uid);
  }

  function updateActive(event) {
    partnerIndex = event.detail;
  }

</script>

<Navbar />
<main>
  {#await userIDsPromise then userIDs}
    <Sidebar {userIDs} {partnerIndex} on:updateActive={updateActive}/>
    {#if userIDs}
      <Content {userIDs} {uid} {partnerIndex}/>
    {:else}
      <h1>You current don't have any conversations :(</h1>
    {/if}
  {/await}
</main>


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
</style>