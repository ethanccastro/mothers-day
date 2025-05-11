document.addEventListener('DOMContentLoaded', function() {
    let motherDayItems = [];
    const galleryContainer = document.getElementById('gallery-container'); 
    const indexHeaderText = document.getElementById('index-header-text');
    const motherDayItemsEnglish = [
        {
            imageSrc: 'images/20250113_125343.jpg',
            title: 'Our Rock',
            description: `Mom, Mommy, Mama, Ma, and Gummy Bear. We all call you different names, but we are always calling because we need one thing: our rock! You are our first love, and the love you give us back is something that we will always remember! Thank you for choosing to be a part of our lives and never leaving our side. We appreciate everything you do for us, no matter how big or small.`
        },
        {
            imageSrc: 'images/20250427_121852.jpg',
            title: 'Your tree: From Noah & Jaylen',
            description: `Hi Mommy! This is the tree that you've created: two loving sons. Thank you for giving us a wonderful and fun childhood! There are so many core memories that you gave us, like playing hide and seek in the house, walking us to McDonalds, and taking us to the acquarium! 
                          Thank you for being such a fun mommy! We will cherish these moments and when we grow up, we will learn to appreciate everything that you did for us, no matter how tired you were! We love you!ßß`
        },
        {
            imageSrc: 'images/20250302_163221.jpg',
            title: 'From: Babe',
            description: `Hi Mama! Thank you for being a wonderful mama and beng the best partner in the world! You make my life more colorful and it feels amazing experiencing life with you by my side. I love the days where we stay home and eat, the days where we scavenge for things to do, and the days where we just lay side by side, doing nothing. I appreciate you a lot! I love you Gummy Bear!`
        },
        {
            imageSrc: 'images/IMG_0884.JPG',
            title: 'Noah: Ma, what is that?',
            description: ``
        },
        {
            imageSrc: 'images/IMG_0768.JPG',
            title: 'Jaylen: "BEE! BEE!!"',
            description: ``
        },
        {
            imageSrc: 'images/IMG_1669.JPEG',
            title: 'Gummy Bear!',
            description: ``
        }
        ,
        {
            imageSrc: 'images/20220314_115843_IMG_1942.jpeg',
            title: 'Can you guess what happened a few days later?',
            description: ``
        }                                      
    ];
    const motherDayItemsSpanish = [
        {
            imageSrc: 'images/20250113_125343.jpg',
            title: 'Nuestra Roca',
            description: `Mamá, Mami, Mamá, Ma y Osita de Goma. Todos te llamamos por nombres diferentes, ¡pero siempre te llamamos porque necesitamos una cosa: nuestra roca! Eres nuestro primer amor, ¡y el amor que nos devuelves es algo que siempre recordaremos! Gracias por elegir ser parte de nuestras vidas y nunca apartarte de nuestro lado. Apreciamos todo lo que haces por nosotros, no importa cuán grande o pequeño sea.`
        },
        {
            imageSrc: 'images/20250427_121852.jpg',
            title: 'Tu árbol: De Noah y Jaylen',
            description: `¡Hola mami! Este es el árbol que has creado: dos hijos cariñosos. ¡Gracias por darnos una infancia maravillosa y divertida! Hay tantos recuerdos fundamentales que nos diste, como jugar al escondite en la casa, llevarnos caminando a McDonalds y ¡llevarnos al acuario!
                          ¡Gracias por ser una mami tan divertida! Atesoraremos estos momentos y cuando crezcamos, aprenderemos a apreciar todo lo que hiciste por nosotros, ¡sin importar lo cansada que estuvieras! ¡Te queremos!`
        },
        {
            imageSrc: 'images/20250302_163221.jpg',
            title: 'De: Babe',
            description: `¡Hola Mamá! ¡Gracias por ser una mamá maravillosa y ser la mejor compañera del mundo! Haces mi vida más colorida y se siente increíble experimentar la vida contigo a mi lado. Amo los días en que nos quedamos en casa y comemos, los días en que buscamos cosas que hacer y los días en que simplemente nos acostamos uno al lado del otro, sin hacer nada. ¡Te aprecio mucho! ¡Te amo, Osita de Goma!`
        },
        {
            imageSrc: 'images/IMG_0884.JPG',
            title: 'Noah: Ma, ¿qué es eso?',
            description: ``
        },
        {
            imageSrc: 'images/IMG_0768.JPG',
            title: 'Jaylen: "¡ABEEJA! ¡¡ABEEJA!!"',
            description: ``
        },
        {
            imageSrc: 'images/IMG_1669.JPEG',
            title: '¡Osita de Goma!',
            description: ``
        }
        ,
        {
            imageSrc: 'images/20220314_115843_IMG_1942.jpeg',
            title: '¿Puedes adivinar qué pasó unos días después?',
            description: ``
        }                                
    ];    
    const indexHeaderTextEnglish = 
    `
        <h1>2025 Happy Mother's Day!</h1>
        <p>Celebrating the GREATEST mother of all time!</p>    
    `;
    const indexHeaderTextSpanish = 
    `
        <h1>2025 ¡Feliz Día de la Madre!</h1>
        <p>¡Celebrando a la MEJOR madre de todos los tiempos!</p>    
    `;    
    if (localStorage.getItem("lang") == "en") {
        motherDayItems = motherDayItemsEnglish;
        indexHeaderText.innerHTML = indexHeaderTextEnglish;
    }
    if (localStorage.getItem("lang") == "sp") {
        motherDayItems = motherDayItemsSpanish;
        indexHeaderText.innerHTML = indexHeaderTextSpanish;
    }       
    // ===========================================================

    function renderGallery() {
        galleryContainer.innerHTML = ''; 

        motherDayItems.forEach(item => {
            const galleryItemDiv = document.createElement('div');
            galleryItemDiv.classList.add('gallery-item');

            const img = document.createElement('img');
            img.src = item.imageSrc;
            img.alt = item.title;
            
            img.onerror = function() {
                this.onerror = null;
                this.src = 'images/placeholder.jpg';
                this.alt = 'Image not available';
            };

            const itemContentDiv = document.createElement('div');
            itemContentDiv.classList.add('item-content');

            const titleH2 = document.createElement('h2');
            titleH2.textContent = item.title;

            const descriptionP = document.createElement('p');
            descriptionP.textContent = item.description;

            itemContentDiv.appendChild(titleH2);
            itemContentDiv.appendChild(descriptionP);

            galleryItemDiv.appendChild(img);
            galleryItemDiv.appendChild(itemContentDiv);

            galleryContainer.appendChild(galleryItemDiv);
        });
    }
    renderGallery();
});