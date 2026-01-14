const questions = [
    {
        question: "How do you feel when you play with friends?",
        answers: ["Happy", "Sad", "Angry"]
    },
    {
        question: "What do you do when you feel sad?",
        answers: ["Talk to someone", "Cry", "Play a game"]
    },
    {
        question: "How do you feel when you help someone?",
        answers: ["Happy", "Proud", "Tired"]
    },
    {
        question: "What is your favorite activity?",
        answers: ["Drawing", "Reading", "Playing"]
    },
    {
        question: "How do you feel in the morning?",
        answers: ["Happy", "Sleepy", "Excited"]
    }
];

let currentQuestion = 0;
const userAnswers = [];

const quizContainer = document.getElementById("quiz-container");

function showQuestion() {
    if (currentQuestion >= questions.length) {
        showResults();
        return;
    }

    const q = questions[currentQuestion];
    quizContainer.innerHTML = <h2>${q.question}</h2>;

    q.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => {
            userAnswers.push(answer);
            currentQuestion++;
            showQuestion();
        };
        quizContainer.appendChild(button);
    });
}

function showResults() {
    quizContainer.innerHTML = "<h2>Thank you for completing the quiz!</h2>";

    const counts = {};
    userAnswers.forEach(answer => {
        counts[answer] = (counts[answer] || 0) + 1;
    });

    const ctx = document.getElementById("resultChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(counts),
            datasets: [{
                label: "Your answers",
                data: Object.values(counts),
                backgroundColor: [
                    "#FFD700",
                    "#00BFFF",
                    "#FF6347",
                    "#32CD32",
                    "#FF69B4"
                ]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

showQuestion();