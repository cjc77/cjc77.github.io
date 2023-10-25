document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.getElementById("menu");
    const lines = document.querySelectorAll(".hamburger-line");
    const summary = document.getElementById("summary");
    const header = document.getElementById("header");
    const headerUl = document.querySelector('.header ul');

    // Call the function to set the initial margin-top
    updateSummaryMargin();

    // Function to update the margin-top of the summary section
    function updateSummaryMargin() {
        const headerHeight = document.querySelector(".header").offsetHeight + 20;
        // const menuHeight = menu.classList.contains("active") ? 0 : 0; // Adjust the menu height as needed
        summary.style.marginTop = (headerHeight) + "px";
    }

    // Example function to check if menu is active
    function menuIsActive() {
        return menu.classList.contains('active');
    }

    // Function to close the menu
    function closeMenu() {
        // Close the menu
        menu.classList.remove("active");
        lines.forEach(line => {
            line.classList.remove("expand");
        });
    }

    // If window is resized, close menu & update the margin for top heading section 
    window.addEventListener("resize", function() {
        closeMenu();
        updateSummaryMargin();
    });

    // Once header menu close animation completes, update margin for top heading section
    // Need this in case window is resized while menu is open
    headerUl.addEventListener('transitionend', function(event) {
        // Check if the transitioned property is the one you're interested in, e.g., 'max-height'
        // Only want to update margin when menu is closing
        if (event.propertyName === 'max-height' && !menuIsActive()) {
            updateSummaryMargin();
        }
    });

    document.addEventListener("click", function(event) {
        if (header.contains(event.target)) {
            // Clicked inside the header (which includes the hamburger and menu)
            if (hamburger.contains(event.target)) {
                // Specifically clicked the hamburger
                menu.classList.toggle("active");
                lines.forEach(line => {
                    line.classList.toggle("expand");
                });
            }
        } else {
            // Clicked outside the header
            menu.classList.remove("active");
            lines.forEach(line => {
                line.classList.remove("expand");
            });
        }
    });

    // Get all menu links
    const menuLinks = document.querySelectorAll("#menu a");

    // Add click event listener to each menu link
    menuLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            // Prevent default behavior
            event.preventDefault();

            // Get the target section ID from the link's href attribute
            const targetId = this.getAttribute("href").substring(1);  // Remove the '#' from href
            const targetSection = document.getElementById(targetId);

            // Close the menu
            // menu.classList.remove("active");
            // lines.forEach(line => {
            //     line.classList.remove("expand");
            // });
            closeMenu();

            // Scroll to the target section, adjusted for menu height
            const menuHeight = menu.offsetHeight;
            const offsetTop = targetSection.offsetTop - menuHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        });
    });
});