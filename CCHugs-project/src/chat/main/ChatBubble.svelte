<script>
  export let message = {};
  export let uid;
</script>

<div id="message-container" class:author={message.author === uid}>
  <p>{message.content}</p>
</div>

<style>

  .author {
    background-color: #ffe66d !important;
    align-self: flex-end;
  }

  #message-container {
    border: none;
    border-radius: 4px;
    display: flex;
    justify-content: flex-start;
    background-color: #c4c4c4;
    width: 12.5vw;
    margin-top: 12px;
  }

  #message-container p {
    padding: 0 12px;
    font-size: 1em;
    width: 100%;
    word-break: break-word;
  }
</style>