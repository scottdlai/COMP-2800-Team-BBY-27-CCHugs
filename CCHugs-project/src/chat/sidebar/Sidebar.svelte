<script>
  import { createEventDispatcher } from 'svelte';
  import UserTab from './UserTab.svelte';

  export let userIDs = [];
  export let partnerIndex;

  let activeUser = userIDs[partnerIndex];

  let dispatch = createEventDispatcher();

  function updateActive(index) {
    dispatch('updateActive', index);
  }

</script>

<main class="users-container">
  <h1>Chat</h1>
  {#each userIDs as userID, index (userID)}
    <UserTab userID={userID} on:click={() => updateActive(index)}/>
  {:else}
    <p>Start connecting with people :)</p> 
  {/each}
</main>

<style>
  .users-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
</style>

<!-- <style>
  main {
    grid-column: 1 / span 1;
    border: 2px solid black;
    border-left: none;
    border-top: none;
  }
</style> -->