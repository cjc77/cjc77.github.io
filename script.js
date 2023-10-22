document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.getElementById("menu");
    const lines = document.querySelectorAll(".hamburger-line");
    const summary = document.getElementById("summary");

    // Function to update the margin-top of the summary section
    function updateSummaryMargin() {
        const headerHeight = document.querySelector(".header").offsetHeight + 20;
        // const menuHeight = menu.classList.contains("active") ? 0 : 0; // Adjust the menu height as needed
        summary.style.marginTop = (headerHeight) + "px";
    }

    // Call the function to set the initial margin-top
    updateSummaryMargin();

    hamburger.addEventListener("click", function() {
        menu.classList.toggle("active");
        lines.forEach(line => {
            line.classList.toggle("expand");
        });

        // // Update margin-top for the summary section
        // setTimeout(updateSummaryMargin, 500);
    });

    // // Add a resize event listener to adjust the summary padding when the window is resized
    // window.addEventListener("resize", function() {
    //     updateSummaryMargin();
    // });

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
            menu.classList.remove("active");
            lines.forEach(line => {
                line.classList.remove("expand");
            });
            // // summary.style.marginTop = 200 + "px";
            // setTimeout(updateSummaryMargin, 500);

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