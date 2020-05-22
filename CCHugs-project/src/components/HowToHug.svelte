<!---------------------------------------------------------->
<!--------------------------- Modal: ----------------------->
<!-------------------------- Source:------------------------>
<!-- https://www.w3schools.com/howto/howto_css_modals.asp -->
<!---------------------------------------------------------->

<section>
<button id="howToHug">How-To-Hug</button>
<div id="myModal" class="modal">
  <div class="modal-content">
        <span class="close">&times;</span>
        <h2>How-To Guide</h2>

        <div id="howto">
            <div id="accordion">
                <div class="card" style="background-color:#ff9e6d;border:none">
                        <div class="card-header" id="headingOne" style="background-color:#ffaf87"> 
                            <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne"
                                aria-expanded="true" aria-controls="collapseOne">Send a hug
                            </button>
                            </h5>
                        </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="card-body">
                            <p>1. Sign up</p>
                            <p>2. Choose to “Send a hug”</p>
                            <p>3. Add an optional positive message for the Huggee (the recipient -
                                  you won’t know who it is!)</p>
                            <p>4. Click “Send”!</p> 
                        </div>
                    </div>
                </div>

            <div class="card" style="background-color:#ff9e6d;border:none">
                    <div class="card-header" id="headingTwo" style="background-color:#ffaf87">
                        <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" 
                                aria-expanded="false" aria-controls="collapseTwo">Receive a hug
                        </button>
                        </h5>
                    </div>

                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div class="card-body">
                        <p>1. Check your hug notifications</p>
                        <p>2. Open the hug</p>
                        <p>3. See if the Hugser (the sender) sent you a message with the hug</p>    
                    </div>
                </div>
            </div>

            <div class="card" style="background-color:#ff9e6d;border:none">
                    <div class="card-header" id="headingThree" style="background-color:#ffaf87"> 
                        <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" 
                            aria-expanded="false" aria-controls="collapseThree">Add a friend
                        </button>
                        </h5>
                    </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div class="card-body">
                        <p>1. Send a friend request to fellow Hugser</p>
                        <p>2. Once accepted, keep the conversation going with more hugs and chats</p>
                        <p>3. Add personal friends. You can send hugs to them too</p>    
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>
</section>

<script>
var modal = document.getElementById("myModal");
var btn = document.getElementById("howToHug");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  let howTo = document.getElementById("navbarSupportedContent");
  howTo.setAttribute("class", "collapse navbar-collapse");
  }
}

span.onclick = function() {
  modal.style.display = "none";
    let howTo = document.getElementById("navbarSupportedContent");
  howTo.setAttribute("class", "collapse navbar-collapse");
}
</script>

<style>
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid black;
  width: 80%;
}

.close {
  color: black;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

button {
	font-size: 75%;
	border: none;
    background-color: transparent;
    }

#howToHug{
    font-size:200%
}
</style>