// STUDYLINK - COMPLETE JAVASCRIPT

const sampleTutors = [
    {
        id: "sample1",
        name: "Mary Wanjiku",
        registrationNumber: "",
        email: "",
        subject: "Programming",
        level: "Third Year",
        availability: "Weekdays",
        description: "I can help with Java, HTML and basic web development.",
        photo: ""
    },
    {
        id: "sample2",
        name: "Brian Otieno",
        registrationNumber: "",
        email: "",
        subject: "Networking",
        level: "Fourth Year",
        availability: "Weekends",
        description: "I offer help with networking and Cisco Packet Tracer.",
        photo: ""
    },
    {
        id: "sample3",
        name: "Faith Achieng",
        registrationNumber: "",
        email: "",
        subject: "Database Systems",
        level: "Third Year",
        availability: "Evenings",
        description: "I can help with SQL, MySQL and database design.",
        photo: ""
    },
    {
        id: "sample4",
        name: "Kevin Mwangi",
        registrationNumber: "",
        email: "",
        subject: "Mathematics",
        level: "Second Year",
        availability: "Afternoons",
        description: "I help students understand mathematics.",
        photo: ""
    }
];

const TUTOR_KEY = "studylink_tutors";
const REQUEST_KEY = "studylink_requests";

// GET TUTORS
function getTutors() {
    try {
        const saved = localStorage.getItem(TUTOR_KEY);

        if (!saved) {
            localStorage.setItem(TUTOR_KEY, JSON.stringify(sampleTutors));
            return [...sampleTutors];
        }

        const tutors = JSON.parse(saved);

        if (!Array.isArray(tutors) || tutors.length === 0) {
            localStorage.setItem(TUTOR_KEY, JSON.stringify(sampleTutors));
            return [...sampleTutors];
        }

        return tutors;
    } catch (error) {
        localStorage.setItem(TUTOR_KEY, JSON.stringify(sampleTutors));
        return [...sampleTutors];
    }
}

// SAVE TUTORS
function saveTutors(tutors) {
    localStorage.setItem(TUTOR_KEY, JSON.stringify(tutors));
}

// ADD A TUTOR
function addTutor(tutor) {
    const tutors = getTutors();
    tutors.push(tutor);
    saveTutors(tutors);
}

// DISPLAY TUTORS
function displayTutors(tutors = getTutors()) {
    const tutorGrid = document.getElementById("tutorGrid");
    const noTutorsMessage = document.getElementById("noTutorsMessage");

    if (!tutorGrid) return;

    tutorGrid.innerHTML = "";

    if (tutors.length === 0) {
        if (noTutorsMessage) noTutorsMessage.style.display = "block";
        return;
    }

    if (noTutorsMessage) noTutorsMessage.style.display = "none";

    tutors.forEach(tutor => {
        const card = document.createElement("div");
        card.className = "tutor-card";

        const image = tutor.photo
            ? `<img src="${tutor.photo}" alt="${tutor.name}" class="tutor-photo">`
            : "";

        card.innerHTML = `
            ${image}
            <h3>${tutor.name}</h3>
            <p><strong>Subject:</strong> ${tutor.subject}</p>
            <p><strong>Year:</strong> ${tutor.level}</p>
            <p><strong>Availability:</strong> ${tutor.availability}</p>
            <p>${tutor.description}</p>
            <button type="button" class="btn request-btn"
                data-id="${tutor.id}">Request a Session</button>
        `;

        tutorGrid.appendChild(card);
    });

    document.querySelectorAll(".request-btn").forEach(button => {
        button.addEventListener("click", function () {
            const tutor = getTutors().find(t => t.id === this.dataset.id);

            if (!tutor) return;

            const studentName = prompt("Enter your full name:");
            if (!studentName) return;

            const request = {
                id: "request" + Date.now(),
                tutorId: tutor.id,
                tutorName: tutor.name,
                studentName: studentName,
                subject: tutor.subject,
                status: "Pending"
            };

            const requests = JSON.parse(
                localStorage.getItem(REQUEST_KEY) || "[]"
            );

            requests.push(request);
            localStorage.setItem(REQUEST_KEY, JSON.stringify(requests));

            alert("Your session request has been submitted!");
        });
    });
}

// REGISTER A NEW TUTOR
function setupTutorForm() {
    const form = document.getElementById("tutorForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const tutor = {
            id: "tutor" + Date.now(),
            name: document.getElementById("studentName").value.trim(),
            registrationNumber: document.getElementById("registrationNumber").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value,
            level: document.getElementById("studyLevel").value,
            availability: document.getElementById("availability").value,
            description: document.getElementById("description").value.trim(),
            photo: ""
        };

        const photoInput = document.getElementById("profilePhoto");
        const photoFile = photoInput && photoInput.files[0];

        function finishRegistration() {
            try {
                addTutor(tutor);

                const message = document.getElementById("registrationMessage");
                if (message) {
                    message.textContent = "Registration successful! You are now listed as a tutor.";
                    message.style.color = "green";
                }

                form.reset();

            } catch (error) {
                alert("Registration could not be saved. Please try again without a photo.");
                console.error(error);
            }
        }

        if (photoFile) {
            const reader = new FileReader();

            reader.onload = function (event) {
                tutor.photo = event.target.result;
                finishRegistration();
            };

            reader.onerror = finishRegistration;
            reader.readAsDataURL(photoFile);
        } else {
            finishRegistration();
        }
    });
}

// SEARCH TUTORS
function setupTutorSearch() {
    const searchInput = document.getElementById("searchInput");
    const subjectFilter = document.getElementById("subjectFilter");
    const searchButton = document.getElementById("searchButton");

    if (!searchInput || !subjectFilter || !searchButton) return;

    function searchTutors() {
        const nameOrSubject = searchInput.value.toLowerCase().trim();
        const selectedSubject = subjectFilter.value;

        const filtered = getTutors().filter(tutor => {
            const matchesText =
                tutor.name.toLowerCase().includes(nameOrSubject) ||
                tutor.subject.toLowerCase().includes(nameOrSubject);

            const matchesSubject =
                !selectedSubject || tutor.subject === selectedSubject;

            return matchesText && matchesSubject;
        });

        displayTutors(filtered);
    }

    searchButton.addEventListener("click", searchTutors);
    searchInput.addEventListener("input", searchTutors);
    subjectFilter.addEventListener("change", searchTutors);
}

// DASHBOARD
function loadDashboard() {
    const requests = JSON.parse(localStorage.getItem(REQUEST_KEY) || "[]");

    const sessionCount = document.getElementById("sessionCount");
    const pendingCount = document.getElementById("pendingCount");
    const subjectCount = document.getElementById("subjectCount");
    const activityList = document.getElementById("activityList");
    const noActivities = document.getElementById("noActivitiesMessage");

    if (sessionCount) {
        sessionCount.textContent = requests.filter(r => r.status === "Accepted").length;
    }

    if (pendingCount) {
        pendingCount.textContent = requests.filter(r => r.status === "Pending").length;
    }

    if (subjectCount) {
        subjectCount.textContent = new Set(requests.map(r => r.subject)).size;
    }

    if (activityList) {
        activityList.innerHTML = "";

        requests.forEach(request => {
            const item = document.createElement("div");
            item.className = "activity-card";
            item.textContent = `${request.tutorName} - ${request.subject} - ${request.status}`;
            activityList.appendChild(item);
        });
    }

    if (noActivities) {
        noActivities.style.display = requests.length ? "none" : "block";
    }
}

// START THE WEBSITE
document.addEventListener("DOMContentLoaded", function () {
    console.log("StudyLink loaded successfully!");

    displayTutors();
    setupTutorForm();
    setupTutorSearch();
    loadDashboard();
});