// =========================
// Налаштування
// =========================

const BOOK_COUNT = 2;
const CHAPTERS_PER_BOOK = 16;

// =========================
// Змінні
// =========================

let currentBook = null;
let currentChapter = null;

// =========================
// Елементи
// =========================

const booksDiv = document.getElementById("books");
const chaptersDiv = document.getElementById("chapters");

const reader =
document.getElementById("reader");

const title =
document.getElementById("title");

const chapterNavigation =
document.getElementById(
    "chapterNavigation"
);

const prevChapterBtn =
document.getElementById(
    "prevChapterBtn"
);

const nextChapterBtn =
document.getElementById(
    "nextChapterBtn"
);

const sidebar =
document.getElementById(
    "sidebar"
);

const mobileBtn =
document.getElementById(
    "mobileMenuBtn"
);

// =========================
// Створення книг
// =========================

for(let i = 1; i <= BOOK_COUNT; i++){

    const btn =
    document.createElement("button");

    btn.className = "book-btn";

    btn.textContent =
    `Книга ${i}`;

    btn.onclick =
    () => selectBook(i);

    booksDiv.appendChild(btn);
}

// =========================
// Вибір книги
// =========================

function selectBook(book){

    currentBook = book;

    localStorage.setItem(
        "lastBook",
        book
    );

    document
    .querySelectorAll(".book-btn")
    .forEach(btn =>
        btn.classList.remove("active")
    );

    document
    .querySelectorAll(".book-btn")
    [book - 1]
    .classList.add("active");

    chaptersDiv.innerHTML = "";

    for(let i = 1; i <= CHAPTERS_PER_BOOK; i++){

        const btn =
        document.createElement("button");

        btn.className =
        "chapter-btn";

        btn.textContent =
        `Глава ${i}`;

        btn.onclick =
        () => loadChapter(
            book,
            i
        );

        chaptersDiv.appendChild(
            btn
        );
    }
}

// =========================
// Завантаження глави
// =========================

async function loadChapter(
    book,
    chapter
){

    try{

        const path =
        `book${book}/Глава ${chapter}.txt`;

        const response =
        await fetch(path);

        if(!response.ok)
            throw new Error();

        const text =
        await response.text();

        title.textContent =
        `Книга ${book} — Глава ${chapter}`;

        currentBook = book;
        currentChapter = chapter;

        chapterNavigation.style.display =
        "flex";

        reader.style.opacity = 0;

        setTimeout(() => {
        
            reader.textContent =
            text;
        
            reader.style.opacity = 1;
        
        }, 250);

        reader.scrollTop = 0;

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

        localStorage.setItem(
            "lastBook",
            book
        );

        localStorage.setItem(
            "lastChapter",
            chapter
        );

        // Активна глава

        document
        .querySelectorAll(
            ".chapter-btn"
        )
        .forEach(btn =>
            btn.classList.remove(
                "active"
            )
        );

        document
        .querySelectorAll(
            ".chapter-btn"
        )
        [chapter - 1]
        .classList.add(
            "active"
        );

        // Закриття меню на телефоні

        if(
            window.innerWidth <= 900
        ){
            sidebar.classList.remove(
                "show"
            );
        }

    }

    catch{

        reader.innerHTML = `
        <div class="placeholder">
            Не вдалося знайти файл архіву:
            <br><br>
            book${book}/Глава ${chapter}.txt
        </div>
        `;
    }
}

// =========================
// Попередня глава
// =========================

prevChapterBtn.onclick =
() => {

    if(
        currentChapter > 1
    ){

        loadChapter(
            currentBook,
            currentChapter - 1
        );
    }
};

// =========================
// Наступна глава
// =========================

nextChapterBtn.onclick =
() => {

    if(
        currentChapter <
        CHAPTERS_PER_BOOK
    ){

        loadChapter(
            currentBook,
            currentChapter + 1
        );
    }
};

// =========================
// Пошук Книг
// =========================

const searchInput =
document.getElementById(
    "searchInput"
);

searchInput.addEventListener(
    "input",
    () => {

        const value =
        searchInput.value
        .toLowerCase();

        document
        .querySelectorAll(
            ".chapter-btn"
        )
        .forEach(btn => {

            btn.style.display =
            btn.textContent
            .toLowerCase()
            .includes(value)

            ? "block"
            : "none";
        });
    }
);

// =========================
// Змінити Тему
// =========================

const themeSelect =
document.getElementById(
    "themeSelect"
);

themeSelect.onchange = () => {

    document.body.dataset.theme =
    themeSelect.value;

    localStorage.setItem(
        "theme",
        themeSelect.value
    );
};

const savedTheme =
localStorage.getItem(
    "theme"
);

if(savedTheme){

    document.body.dataset.theme =
    savedTheme;

    themeSelect.value =
    savedTheme;
}

// =========================
// Відкрити меню
// =========================

mobileBtn.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "show"
        );
    }
);

// =========================
// Завантажити останню книгу
// =========================

const lastBook =
Number(
    localStorage.getItem(
        "lastBook"
    )
);

const lastChapter =
Number(
    localStorage.getItem(
        "lastChapter"
    )
);

if(lastBook){

    selectBook(lastBook);

    if(lastChapter){

        loadChapter(
            lastBook,
            lastChapter
        );
    }
}

const music =
document.getElementById(
    "bgMusic"
);

const musicBtn =
document.getElementById(
    "musicBtn"
);

musicBtn.onclick = () => {

    if(music.paused){

        music.play();

        musicBtn.textContent =
        "🔇 Вимкнути";
    }
    else{

        music.pause();

        musicBtn.textContent =
        "🎵 Музика";
    }
};

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            document
            .getElementById(
                "loader"
            )
            .remove();

        }, 1200);
    }
);
