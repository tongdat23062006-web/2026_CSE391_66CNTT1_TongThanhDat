//1.1
const btnAdd = document.querySelector('.btn--add');
const nameInput = document.getElementById('nameInput');
const scoreInput = document.getElementById('scoreInput');
const tableBody = document.getElementById('studentTable');
const stats = document.getElementById('stats');

let students = [];

function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7) return "Khá";
    if (score >= 5) return "Trung bình";
    return "Yếu";
}

function renderTable() {

    tableBody.innerHTML = "";

    filteredStudents.forEach((sv, index) => {

        const tr = document.createElement("tr");

        if (sv.score < 5) {
            tr.style.backgroundColor = "yellow";
        }

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.name}</td>
            <td>${sv.score}</td>
            <td>${getRank(sv.score)}</td>
            <td><button class="delete-btn" data-index="${index}">Xóa</button></td>
        `;

        tableBody.appendChild(tr);
    });

    updateStats();
}

function updateStats() {

    let total = filteredStudents.length;

    let avg = 0;

    if (total > 0) {
        let sum = filteredStudents.reduce((s, sv) => s + sv.score, 0);
        avg = (sum / total).toFixed(2);
    }

    stats.innerText = `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`;
}

function addStudent() {

    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        Swal.fire({
            title: "Dữ liệu không hợp lệ", 
            icon: "warning"
        });
        return;
    }

    students.push({
        name: name,
        score: score
    });

    applyFilter();

    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
}

btnAdd.addEventListener("click", addStudent);

scoreInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addStudent();
    }
});

tableBody.addEventListener("click", function(e) {

    if (e.target.classList.contains("delete-btn")) {

        let index = e.target.dataset.index;
        let student = filteredStudents[index];
        let realIndex = students.indexOf(student)

        students.splice(realIndex, 1);

        applyFilter();
    }
});

//1.2
const searchInput = document.getElementById('searchInput');
const rankFilter = document.getElementById('rankFilter');
const scoreFilter = document.getElementById('sort');

let filteredStudents = [...students];
let keyword = "";
let rankValue = "All";
let sortAsc = true;

searchInput.addEventListener('input', function() {
    
    // let keyword = searchInput.value.trim().toLowerCase();
    
    // if(keyword === ""){
    //     filteredStudents = [...students];
    // } else {
    //     filteredStudents = students.filter(student => {
    //         let name = student.name.trim().toLowerCase();
    //         return name.includes(keyword);
    //     });
    // }
    //
    //renderTable();

    keyword = searchInput.value.trim().toLowerCase();

    applyFilter();
});

rankFilter.addEventListener('change', function(){

    // let rankValue = this.value;

    // if (rankValue === 'All'){
    //     filteredStudents = [...students];
    // } else {
    //     filteredStudents = students.filter(student =>{
    //         return getRank(student.score) === rankValue;
    //     });
    // }

    // renderTable();

    rankValue = this.value;

    applyFilter();
});

scoreFilter.addEventListener('click', function(){

    // if (scoreFilter.textContent === 'Điểm ▼' || scoreFilter.textContent === 'Điểm'){
    //     scoreFilter.textContent = 'Điểm ▲';
    //     // filteredStudents = students.sort((a, b) => a.score - b.score);
    // } else {
    //     scoreFilter.textContent = 'Điểm ▼';
    //     // filteredStudents = students.sort((a, b) => b.score - a.score);
    // }
    // renderTable();

    scoreFilter.textContent = sortAsc ? "Điểm ▲" : 'Điểm ▼';

    sortAsc = !sortAsc;

    applyFilter();
});

function applyFilter(){
    filteredStudents = students.filter(student => {

        let name = student.name.trim().toLowerCase();
        let keywordMatch = name.includes(keyword);

        let rankMatch = true;

        if (rankValue !== "All"){
            rankMatch = (rankValue === getRank(student.score));
        }

        return rankMatch && keywordMatch;
    });

    filteredStudents.sort((a,b)=>{
        return sortAsc ? a.score - b.score : b.score - a.score;
    });

    renderTable();
}