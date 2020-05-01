<script>
  export let user = {};
  export let activeChat = false;
</script>

<main class:active={activeChat} on:click>
  <h3>{user.username}</h3>
</main>

<style>
  .active {
    background-color: #ff9e6d;
    color: white;
  }

  main {
    display: flex;
    align-items: center;
    border: 1px solid black;
  }
</style>