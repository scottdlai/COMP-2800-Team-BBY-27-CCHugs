<script>
  export let message;
</script>

<input type="text" bind:value={message} placeholder="type here..."/>

<style>
  input {
    width: 56.25vw;
    height: 15vh;
    border-radius: 4px;
    border: none;
    background-color: #c4c4c4;
    color: white;
    font-size: 1em;
    outline: none;
    resize: none;
    padding-left: 12px;
    font-size: 2em;
  }

  input:focus::placeholder {
    color: transparent;
  }
</style>