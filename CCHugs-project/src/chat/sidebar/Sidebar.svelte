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

<main>
  {#each userIDs as userID, index (userID)}
    <UserTab userID={userID} isActive={partnerIndex === index} 
    on:click={() => updateActive(index)}/>
  {:else}
    <p>Start connecting with people :)</p> 
  {/each}
</main>

<style>
  main {
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
    border: 2px solid black;
    border-left: none;
    border-top: none;
  }
</style>