<script>

let isSticky = false;

const handleScrolldown = () => {
  isSticky = true;
  if (window.scrollY==0){
    isSticky = false;
  }
}

</script>

<svelte:window on:scroll={handleScrolldown}/>

<main>

   <nav class="navbar navbar-expand-lg navbar-light bg-default sticky" class:sticky={isSticky}>

    <a class="navbar-brand" href="#"> Menu</a>

    <button class="navbar-toggler collapsed " type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-collapse collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto" data-toggle="collapse"  data-target=".navbar-collapse.show">
        <li class="nav-item active" >
          <a class="nav-link" href="#top">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item" >
          <a class="nav-link enabled " href="#features-a">Features</a>
        </li>
        <li class="nav-item" >
          <a class="nav-link enabled" href="#howto-a" >How-To Guide</a>
        </li>
        <li class="nav-item" >
          <a class="nav-link enabled" href="#resources-a">Resources</a>
        </li>
        <li class="nav-item" >
          <a class="nav-link enabled" href="/aboutus"> About Us</a>
        </li>
        <li class="nav-item" >
          <a  class="nav-link enabled" href="/login">Log-in/Sign up</a>
        </li>
        
      </ul>
    </div>
  </nav>
  
</main>

<style>
  
      nav{
        overflow: hidden;
        text-align: center;
        background-color: #ffe66d;
        position: relative;
        top: 0;
        width: 100%;
        z-index: 1;
    }

    .sticky {
      position: fixed;
      top: 0;
      width: 100%;
    }


</style>



