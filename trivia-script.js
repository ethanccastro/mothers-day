document.addEventListener('DOMContentLoaded', function() {
    const questionTextElement = document.getElementById('question-text');
    const answerOptionsElement = document.getElementById('answer-options');
    // const submitAnswerBtn = document.getElementById('submit-answer-btn'); // REMOVED/NOT USED
    const feedbackTextElement = document.getElementById('feedback-text');

    const streakDisplayElement = document.getElementById('streak-display');
    const currentStreakCountElement = document.getElementById('current-streak-count');

    const questionArea = document.getElementById('question-area');
    const prizeArea = document.getElementById('prize-area');
    const revealPrizeBtn = document.getElementById('reveal-prize-btn');
    const prizeRevealTextElement = document.getElementById('prize-reveal-text');
    const prizeImageContainer = document.getElementById('prize-image-container');
    const playAgainFromPrizeBtn = document.getElementById('play-again-from-prize-btn');

    const quizFinishedNoPrizeArea = document.getElementById('quiz-finished-no-prize-area');
    const longestStreakOverallElement = document.getElementById('longest-streak-overall');
    const restartQuizFinalBtn = document.getElementById('restart-quiz-final-btn');

    let triviaQuestions = [
        { question: "Favorite color?", options: ["Blue", "Green", "Purple", "Yellow"], correctAnswer: "Blue" },
        { question: "Birth year?", options: ["1992", "1993", "1996", "1995"], correctAnswer: "1995" },
        { question: "Favorite WWE superstar?", options: ["OTC", "John Cena", "Rhea Ripley", "Cody Rhodes"], correctAnswer: "Rhea Ripley" },
        { question: "How tall?", options: ["4'11", "5'0", "5'1", "5'2"], correctAnswer: "5'0" },
        { question: "Favorite food?", options: ["Shrimp", "Fatty meat", "Coconut", "Pizza!!"], correctAnswer: "Shrimp" },
        { question: "Favorite hobby?", options: ["Watching TIK TOK", "Watching Disney", "Watching WWE", "Watching Netflix"], correctAnswer: "Watching TIK TOK" },
        { question: "Favorite drink?", options: ["Arizona Ice Tea", "Caramel Latte", "Margarita", "Boba"], correctAnswer: "Arizona Ice Tea" },
    ];

    const prizes = [
        { name: "A Giant Hug!", image: null },
        { name: "A Giant Kiss On The Cheek!", image: null }
    ];

    const TARGET_STREAK = 3;
    let currentQuestionIndex = 0;
    let consecutiveCorrectCount = 0;
    // let selectedAnswer = null; // No longer needed as submission is immediate
    let prizeWonThisRound = false;
    let overallLongestStreak = 0;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function updateStreakDisplay() {
        currentStreakCountElement.textContent = consecutiveCorrectCount;
        streakDisplayElement.style.display = 'block';
    }

    function resetQuizState() {
        triviaQuestions = shuffleArray([...triviaQuestions]);
        currentQuestionIndex = 0;
        consecutiveCorrectCount = 0;
        prizeWonThisRound = false;

        feedbackTextElement.textContent = '';
        prizeRevealTextElement.textContent = '';
        prizeImageContainer.innerHTML = '';

        questionArea.style.display = 'block';
        prizeArea.style.display = 'none';
        quizFinishedNoPrizeArea.style.display = 'none';
        revealPrizeBtn.disabled = false;
        revealPrizeBtn.textContent = "Click to Reveal Your Prize!";

        updateStreakDisplay();
        loadQuestion();
    }

    function loadQuestion() {
        feedbackTextElement.textContent = '';
        feedbackTextElement.className = 'feedback';

        if (prizeWonThisRound) return;

        if (currentQuestionIndex < triviaQuestions.length) {
            const currentQuestion = triviaQuestions[currentQuestionIndex];
            questionTextElement.textContent = currentQuestion.question;
            answerOptionsElement.innerHTML = '';
            // selectedAnswer = null; // REMOVED

            currentQuestion.options.forEach(optionText => {
                const button = document.createElement('button');
                button.classList.add('answer-btn');
                button.textContent = optionText;
                button.disabled = false; // Ensure buttons are enabled
                button.addEventListener('click', () => handleAnswerSubmit(optionText, button)); // Pass button for styling
                answerOptionsElement.appendChild(button);
            });
        } else {
            showQuizFinishedNoPrize();
        }
    }

    // Renamed from handleOptionSelect and merged submit logic
    function handleAnswerSubmit(selectedOptionText, clickedButton) {
        // Disable all option buttons immediately to prevent multiple clicks
        Array.from(answerOptionsElement.children).forEach(btn => {
            btn.disabled = true;
            // Optionally, briefly highlight the clicked button
            if (btn === clickedButton) {
                btn.classList.add('selected'); // This class can be used for brief visual cue
            }
        });

        const currentQuestion = triviaQuestions[currentQuestionIndex];
        const isCorrect = selectedOptionText === currentQuestion.correctAnswer;

        // Visual feedback for correct/incorrect on the buttons themselves
        Array.from(answerOptionsElement.children).forEach(btn => {
            if (btn.textContent === currentQuestion.correctAnswer) {
                btn.classList.add('correct-answer-highlight');
            }
            // If the clicked button was wrong, highlight it as wrong
            if (btn === clickedButton && !isCorrect) {
                btn.classList.add('wrong-answer-highlight');
            }
        });


        if (isCorrect) {
            consecutiveCorrectCount++;
            if (consecutiveCorrectCount > overallLongestStreak) {
                overallLongestStreak = consecutiveCorrectCount;
            }
            feedbackTextElement.textContent = "Correct!";
            feedbackTextElement.className = 'feedback correct';

            if (consecutiveCorrectCount === TARGET_STREAK) {
                prizeWonThisRound = true;
                setTimeout(showPrizeSelection, 1500);
            } else {
                setTimeout(() => {
                    currentQuestionIndex++;
                    updateStreakDisplay();
                    loadQuestion();
                }, 1500);
            }
        } else {
            consecutiveCorrectCount = 0;
            feedbackTextElement.textContent = `Incorrect. The correct answer was: ${currentQuestion.correctAnswer}. Streak reset!`;
            feedbackTextElement.className = 'feedback incorrect';
            setTimeout(() => {
                currentQuestionIndex++;
                updateStreakDisplay();
                loadQuestion();
            }, 2000);
        }
        updateStreakDisplay();
    }

    function showPrizeSelection() {
        questionArea.style.display = 'none';
        prizeArea.style.display = 'block';
        prizeRevealTextElement.textContent = '';
        prizeImageContainer.innerHTML = '';
        revealPrizeBtn.disabled = false;
        revealPrizeBtn.textContent = "Click to Reveal Your Prize!";
    }

    revealPrizeBtn.addEventListener('click', function() {
        if (prizes.length > 0) {
            const randomIndex = Math.floor(Math.random() * prizes.length);
            const selectedPrize = prizes[randomIndex];
            prizeRevealTextElement.textContent = `Your Prize: ${selectedPrize.name}`;
            prizeRevealTextElement.className = 'feedback correct';
            if (selectedPrize.image) {
                const img = document.createElement('img');
                img.src = selectedPrize.image;
                img.alt = selectedPrize.name;
                img.style.maxWidth = '200px';
                img.style.maxHeight = '200px';
                img.style.marginTop = '10px';
                img.style.borderRadius = '5px';
                prizeImageContainer.appendChild(img);
            }
            revealPrizeBtn.disabled = true;
            revealPrizeBtn.textContent = "Prize Claimed!";
        } else {
            prizeRevealTextElement.textContent = "No prizes available right now!";
            prizeRevealTextElement.className = 'feedback error';
        }
    });

    function showQuizFinishedNoPrize() {
        questionArea.style.display = 'none';
        prizeArea.style.display = 'none';
        longestStreakOverallElement.textContent = overallLongestStreak;
    }

    playAgainFromPrizeBtn.addEventListener('click', resetQuizState);
    restartQuizFinalBtn.addEventListener('click', resetQuizState);

    resetQuizState();
});