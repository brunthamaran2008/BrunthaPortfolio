function showMessage() {
    alert("Thanks for visiting my portfolio! Let's connect 🚀");
}

// Get projects from backend
fetch("http://localhost:5000/api/projects")
    .then(response => response.json())
    .then(projects => {

        const projectList = document.getElementById("project-list");

        projectList.innerHTML = "";

        projects.forEach(project => {

            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Technology:</strong> ${project.technology}</p>
                <hr>
            `;

            projectList.appendChild(card);
        });

    })
    .catch(error => {
        console.error("Error:", error);
    });


// Contact form
document.getElementById("contactForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {

        alert(data.message);

        this.reset();

    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to send message.");
    });

});