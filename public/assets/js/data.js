
document.getElementById('repositories').style.display = "block";
document.getElementById('defaultRepo').classList.add('activeSubMenu');
// start mobile navbar view 1
function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}
// end mobile navbar view 1

// start mobile navbar view 2
function getMobileMenu() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// When the user clicks on the button, scroll to the top of the document
function scrollUp() {
    window.scrollTo(0, 0);
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
}


// start for tab switching
function getTab(evt, repoSelected) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" activeSubMenu", "");
    }
    document.getElementById(repoSelected).style.display = "block";
    evt.currentTarget.className += " activeSubMenu";

}

function getDate(data) {
    let extract = new Date(data).toString().split(" ");
    return `${extract[2]} ${extract[1]}`
}


