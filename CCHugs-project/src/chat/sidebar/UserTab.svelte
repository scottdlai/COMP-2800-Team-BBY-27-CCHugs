<script>
  export let user = {};
  export let activeChat = false;
</script>

<main class:active={activeChat} on:click>
  {#if activeChat}
    <h2>{user.username}</h2>
  {:else}
    <h3>{user.username}</h3>
  {/if}
</main>

<style>
  .active {
    background-color: #ff9e6d;
    color: white;
  }

  main {
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
  }
</style>