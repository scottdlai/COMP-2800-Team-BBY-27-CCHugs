<script>
  export let user = {};
  export let isActive = false;
</script>

<main class:active={isActive} on:click>
  <h3>{user.username}</h3>
</main>

<style>
  .active {
    background-color: #ff9e6d;
  }

  main {
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
  }
</style>