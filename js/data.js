// StudyLink data storage

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
        description: "I offer help with networking concepts and Cisco Packet Tracer.",
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
        description: "I help students understand mathematical concepts and calculations.",
        photo: ""
    }
];

const TUTOR_KEY = "studylink_tutors";
const REQUEST_KEY = "studylink_requests";

// Get all tutors
function getTutors() {
    let tutors = localStorage.getItem(TUTOR_KEY);

    if (!tutors) {
    saveTutors(sampleTutors);
    return sampleTutors;
    }
    try{
        tutors = JSON.parse(tutors);
        if (!Array.isArray(tutors) || tutors.length=== 0)

            {
                saveTutors(sampleTutors);
                return sampleTutors;
            }
            return tutors;
    }catch (error){
        saveTutors(sampleTutors);
        return sampleTutors;
    }

}

// Save tutor profiles
function saveTutors(tutors) {
    localStorage.setItem(TUTOR_KEY, JSON.stringify(tutors));
}

// Register a new tutor
function addTutor(tutor) {
    const tutors = getTutors();
    tutors.push(tutor);
    saveTutors(tutors);
}

// Get all session requests
function getRequests() {
    const requests = localStorage.getItem(REQUEST_KEY);

    return requests ? JSON.parse(requests) : [];
}

// Save session requests
function saveRequests(requests) {
    localStorage.setItem(REQUEST_KEY, JSON.stringify(requests));
}

// Add a new session request
function addRequest(request) {
    const requests = getRequests();
    requests.push(request);
    saveRequests(requests);
}

// Update a request status
function updateRequestStatus(requestId, newStatus) {
    const requests = getRequests();

    const updatedRequests = requests.map(request => {
        if (request.id === requestId) {
            request.status = newStatus;
        }

        return request;
    });

    saveRequests(updatedRequests);
}