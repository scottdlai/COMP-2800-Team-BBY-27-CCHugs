<script>
  export let chatLog = {};
</script>

<div id="message-container" class:active={chatLog.sender==='currentUser'}>
  <p>{chatLog.message}</p>
</div>

<style>
  #message-container {
    display: block;
    border: none;
    border-radius: 4px;
    padding: 0 24px;
    background-color: #ff9e6d;
    width: 12.5vw;
    margin-top: 12px;
  }

  .active {
    text-align: right;
    background-color: #ffe66d !important;
    align-self: flex-end;
  }
</style>