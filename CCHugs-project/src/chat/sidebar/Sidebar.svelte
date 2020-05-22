<script>
  import { createEventDispatcher } from 'svelte';
  import UserTab from './UserTab.svelte';

  /** List of users that this user is chatting with. */
  export let userIDs = [];

  /** Event dispatcher. */
  const dispatch = createEventDispatcher();

  /**
   * Dispatches event to the Chat component.
   */
  function updateActive({detail}, index) {
    dispatch('updateActive', {
      username: detail,
      index,
    });
  }

</script>

<main class="users-container">
  <h1>Chat</h1>
  {#each userIDs as userID, index (userID)}
    <UserTab userID={userID} on:updateActive={(event) => updateActive(event, index)}/>
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
