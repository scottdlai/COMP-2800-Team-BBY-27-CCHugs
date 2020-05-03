<script>
  export let message = {};

  function isAuthor() {
    console.log(message);
    return message.author.username === 'currentUser';
  }

</script>

<div id="message-container" class:active={message.author.username === 'currentUser'}>
  <p>{message.content}</p>
</div>

<style>

  .active {
    background-color: #ffe66d !important;
    align-self: flex-end;
  }

  #message-container {
    border: none;
    border-radius: 4px;
    display: flex;
    justify-content: flex-start;
    background-color: #ff9e6d;
    width: 12.5vw;
    margin-top: 12px;
  }

  #message-container p {
    padding: 0 12px;
    font-size: 1em;
  }
</style>