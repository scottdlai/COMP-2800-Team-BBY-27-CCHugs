<script>
    import {auth} from "./../Firebase.js";
    import {firestore} from "./../Firebase.js";
    //Signs out the user when the button is clicked.
    function signout(){
        auth.signOut().then(function() {
            window.location = "./";
        }).catch(function(error) {
        // An error happened.
        }); 
    }

</script>
<style>
button {
	/* font-family: inherit; */
	font-size: 200%;
	/* padding: 0.4em;
	margin: 0 0 0.5em 0; */
	/* box-sizing: border-box; */
	border: none;
    background-color: transparent;
    }
</style>
<main>
    <button on:click="{signout}">Log-Out</button>
</main>