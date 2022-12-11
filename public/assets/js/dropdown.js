


document.getElementById("activateDropdown").addEventListener("click", getDropdown);
function getDropdown(event) {
    document.getElementById("plusDropdown").classList.toggle("show");
}


function getProfile() {
    document.getElementById("profileDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    console.log('event click', event.target)
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                document.getElementById("profileDropdown").classList.remove("show");
                openDropdown.classList.remove('show');
            }
        }
    }

    if (!event.target.matches('.profiledropbtn')) {

        let profileDropdowns = document.getElementsByClassName("profile-dropdown-content");
        var i;
        for (i = 0; i < profileDropdowns.length; i++) {
            let profileOpenDropdown = profileDropdowns[i];
            if (profileOpenDropdown.classList.contains('show')) {
                document.getElementById("plusDropdown").classList.remove("show");
                profileOpenDropdown.classList.remove('show');
            }
        }
    }

}


