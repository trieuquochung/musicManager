(function(/*$, x*/) {
    let message = "This is protected.";
    let messageContainer = document.getElementById("message-container");

    function setMessage(value) {
        messageContainer.innerHTML = value;
    }

    setMessage(message);
})(/*jQuery, aREallyLongName*/);