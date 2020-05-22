<script>
  /** Message object. */
  export let message = {};

  /** uid of the currently logged in user. */
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
    align-items: center;
    background-color: #c4c4c4;
    width: 35vw;
    min-height: 10vh;
    margin-top: 12px;
    margin-left: 2vw;
    margin-right: 2vw;
  }

  #message-container p {
    padding: 0 12px;
    font-size: 1em;
    width: 100%;
    word-break: break-word;
  }
</style>