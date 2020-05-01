<script>
  export let user = {};
  export let activeChat = false;
</script>

<main>
  <div class="container" class:active={activeChat} on:click={() => activeChat = !activeChat}>
    <h3>{user.username}</h3>
  </div>
</main>

<style>
  .active {
    background-color: #ff9e6d;
    color: white;
  }
</style>