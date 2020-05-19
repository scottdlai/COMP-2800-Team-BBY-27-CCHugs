<script>
  import ShareTweet from "./ShareTweet.svelte";

</script>

<footer>

    <p>Learn more <a href="/aboutus">about us!</a>
        <br> Created by: Team CCHugs for BCIT COMP2800 2020        
    </p>

    <div> 
    Share on social:
    <ShareTweet />    
    </div>

</footer>


<style>
  footer {
    background-color: #C4C4C4;
    width: 100%;
    bottom: 0px;
    margin-top: 50px;
    padding: 15px;
    display: flex;
    justify-content: space-between;

  }

  p, div {
      margin: 1px;
      padding: 5px;
  }

  div {
      margin-right:50px;
  }
  

   @media (max-width: 600px) {
    footer {
      flex-direction: column;
    }
    p {
      order: 1;
    }
    div {order:2};
   }


</style>
