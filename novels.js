const novels = [

    {
        folder:"knk1",
        cover:"covers/knk1.jpg"
    },
    {
        folder:"knk2",
        cover:"covers/knk1.jpg"
    },



];

const grid =
document.getElementById(
    "novelGrid"
);

novels.forEach(novel => {

    grid.innerHTML += `

    <a
    href="${novel.folder}/index.html"
    class="novel-card">

        <img
        src="${novel.cover}"
        alt="${novel.title}">

        <h2>${novel.title}</h2>

        <p>${novel.description}</p>

    </a>
    


    `;
});



