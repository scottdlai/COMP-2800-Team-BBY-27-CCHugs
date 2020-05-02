<script>
  export let message;
</script>

<textarea type="text" bind:value={message} placeholder="type here..."/>

<style>
  textarea {
    width: 56.25vw;
    height: 15vh;
    border-radius: 4px;
    border: 4px solid black;
    background-color: white;
    font-size: 1em;
    outline: none;
    resize: none;
    padding: 4px 12px;
    font-size: 2em;
  }

  textarea:focus::placeholder {
    color: transparent;
  }
</style>