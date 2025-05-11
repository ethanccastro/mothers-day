document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem("lang") === null) {
        localStorage.setItem("lang", "en");
      }        
    const triviaHeaderArea = document.getElementById('trivia-header-area');

    const questionTextElement = document.getElementById('question-text');
    const answerOptionsElement = document.getElementById('answer-options');
    // const submitAnswerBtn = document.getElementById('submit-answer-btn'); // REMOVED/NOT USED
    const feedbackTextElement = document.getElementById('feedback-text');

    const streakDisplayElement = document.getElementById('streak-display');
    const currentStreakCountElement = document.getElementById('current-streak-count');

    const questionArea = document.getElementById('question-area');
    const prizeArea = document.getElementById('prize-area');
    const prizeAreaText = document.getElementById('prize-area-text');
    const revealPrizeBtn = document.getElementById('reveal-prize-btn');
    const prizeRevealTextElement = document.getElementById('prize-reveal-text');
    const prizeImageContainer = document.getElementById('prize-image-container');
    const playAgainFromPrizeBtn = document.getElementById('play-again-from-prize-btn');

    const quizFinishedNoPrizeArea = document.getElementById('quiz-finished-no-prize-area');
    const longestStreakOverallElement = document.getElementById('longest-streak-overall');
    const restartQuizFinalBtn = document.getElementById('restart-quiz-final-btn');

    let triviaQuestions = [];
    let prizes = [];
    const triviaQuestionsEnglish = [
        { question: "Favorite color?", options: ["Blue", "Green", "Purple", "Yellow"], correctAnswer: "Blue" },
        { question: "Birth year?", options: ["1992", "1993", "1996", "1995"], correctAnswer: "1995" },
        { question: "Favorite WWE superstar?", options: ["OTC", "John Cena", "Rhea Ripley", "Cody Rhodes"], correctAnswer: "Rhea Ripley" },
        { question: "How tall?", options: ["4'11", "5'0", "5'1", "5'2"], correctAnswer: "5'0" },
        { question: "Favorite food?", options: ["Shrimp", "Fatty meat", "Coconut", "Pizza!!"], correctAnswer: "Shrimp" },
        { question: "Favorite hobby?", options: ["Watching TIK TOK", "Watching Disney", "Watching WWE", "Watching Netflix"], correctAnswer: "Watching TIK TOK" },
        { question: "Favorite drink?", options: ["Arizona Ice Tea", "Caramel Latte", "Margarita", "Boba"], correctAnswer: "Arizona Ice Tea" },
    ];
    const triviaQuestionsSpanish = [
        { question: "¿Color favorito?", options: ["Azul", "Verde", "Morado", "Amarillo"], correctAnswer: "Azul" },
        { question: "¿Año de nacimiento?", options: ["1992", "1993", "1996", "1995"], correctAnswer: "1995" },
        { question: "¿Superestrella favorita de la WWE?", options: ["OTC", "John Cena", "Rhea Ripley", "Cody Rhodes"], correctAnswer: "Rhea Ripley" },
        { question: "¿Estatura?", options: ["4'11\"", "5'0\"", "5'1\"", "5'2\""], correctAnswer: "5'0\"" },
        { question: "¿Comida favorita?", options: ["Camarones", "Carne grasosa", "Coco", "¡¡Pizza!!"], correctAnswer: "Camarones" },
        { question: "¿Pasatiempo favorito?", options: ["Ver TikTok", "Ver Disney", "Ver WWE", "Ver Netflix"], correctAnswer: "Ver TikTok" },
        { question: "¿Bebida favorita?", options: ["Té Helado Arizona", "Latte de Caramelo", "Margarita", "Boba"], correctAnswer: "Té Helado Arizona" }
    ];  
    const triviaHeaderAreaEnglish = `
        <h1>Mother's Day Trivia</h1>
        <p>Get 3 correct answers in a row to win a prize!</p>
        `   
    const triviaHeaderAreaSpanish = `
        <h1>Trivia del Día de la Madre</h1>
        <p>¡Consigue 3 respuestas correctas seguidas para ganar un premio!</p>
    `           
    const prizesEnglish = [
        { name: "A Giant Hug!", image: null },
        { name: "A Giant Kiss On The Cheek!", image: null }
    ];
    const prizesSpanish = [
        { name: "¡Un Abrazo Gigante!", image: null },
        { name: "¡Un Beso Gigante En La Mejilla!", image: null }
    ];        

    const prizeAreaTextEnglish = 
    `
        <h2>Yayyyyy you know your own mommy! Congratulations!</h2>
        <p>You got 3 correct answers in a row! Mommy must be so proud! Hopefully nobody helped you!</p>
    `
    const prizeAreaTextSpanish =
    `
        <h2>¡Yupi, conoces bien a tu mami! ¡Felicitaciones!</h2>
        <p>¡Acertaste 3 respuestas correctas seguidas! ¡Mami debe estar muy orgullosa! ¡Ojalá que nadie te haya ayudado!</p>
    `    


    if (localStorage.getItem("lang") == "en") {
        triviaQuestions = triviaQuestionsEnglish;
        prizes = prizesEnglish;
        triviaHeaderArea.innerHTML =  triviaHeaderAreaEnglish;      
        prizeAreaText.innerHTML = prizeAreaTextEnglish;
    }
    if (localStorage.getItem("lang") == "sp") {
        triviaQuestions = triviaQuestionsSpanish;
        prizes = prizesSpanish;
        triviaHeaderArea.innerHTML = triviaHeaderAreaSpanish;
        prizeAreaText.innerHTML = prizeAreaTextSpanish;
    } 

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

        if (localStorage.getItem("lang") == "en") {
            revealPrizeBtn.textContent = "Click to Reveal Your Prize!";

        }
        if (localStorage.getItem("lang") == "sp") {
            revealPrizeBtn.textContent = "Haz clic para revelar tu premio!";

        } 

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
            if (localStorage.getItem("lang") == "en") {
                feedbackTextElement.textContent = "Correct!";
    
            }
            if (localStorage.getItem("lang") == "sp") {
                feedbackTextElement.textContent = "Correcto!";    
            } 

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

            if (localStorage.getItem("lang") == "en") {
                feedbackTextElement.textContent = `Incorrect. The correct answer was: ${currentQuestion.correctAnswer}. Streak reset!`;
    
            }
            if (localStorage.getItem("lang") == "sp") {
                feedbackTextElement.textContent = `Incorrecto. La respuesta correcta era: ${currentQuestion.correctAnswer}. ¡Racha reiniciada!!`;    
            } 

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

        if (localStorage.getItem("lang") == "en") {
            revealPrizeBtn.textContent = "Click to Reveal Your Prize!";

        }
        if (localStorage.getItem("lang") == "sp") {
            revealPrizeBtn.textContent = "Haz clic para revelar tu premio!";

        } 
    }

    revealPrizeBtn.addEventListener('click', function() {
        if (prizes.length > 0) {
            const randomIndex = Math.floor(Math.random() * prizes.length);
            const selectedPrize = prizes[randomIndex];

            if (localStorage.getItem("lang") == "en") {
                prizeRevealTextElement.textContent = `Your Prize: ${selectedPrize.name}`;    
            }
            if (localStorage.getItem("lang") == "sp") {
                prizeRevealTextElement.textContent = `Tu premio: ${selectedPrize.name}`;    
            } 


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