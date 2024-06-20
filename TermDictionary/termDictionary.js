window.onload = function () {
    // 로컬 스토리지에서 저장된 용어 목록을 불러와서 JSON 문자열을 JavaScript 객체로 변환
    const savedTermList = JSON.parse(localStorage.getItem('termlist'));

    // 저장된 용어 목록이 있으면 각 항목을 DOM에 추가
    if (savedTermList) {
        for (let i = 0; i < savedTermList.length; i++) {
            console.log(savedTermList[i]);
            addTermList(savedTermList[i]); // 각 저장된 용어 항목을 리스트에 추가
        }
    }
    
    // 입력 필드와 추가 버튼 요소를 선택
    const termInput = document.querySelector("#termInput");
    const descriptionInput = document.querySelector("#descriptionInput");
    const addBtn = document.querySelector("#addBtn");

    // 추가 버튼에 클릭 이벤트 리스너를 추가하여 새로운 용어 항목을 추가
    addBtn.addEventListener("click", function () {
        if (termInput.value != "" && descriptionInput.value != "") addTermList(); // 입력 필드가 비어 있지 않으면 항목 추가
    });
}

function saveItems() { // 로컬 스토리지에 데이터 저장하기

    const saveItems = []; // 빈 배열 생성
    const listArea = document.querySelector(".listArea");

    // 용어 목록의 각 항목을 순회
    for (let node of listArea.children) {
        // 각 항목의 텍스트 노드를 선택
        const termDescriptionNode = node.querySelector('.termDescriptionText');
        
        // 용어 객체 생성
        const termObj = {
            term: termDescriptionNode.dataset.term, // data-term 속성에서 용어 텍스트 가져오기
            description: termDescriptionNode.dataset.description, // data-description 속성에서 설명 텍스트 가져오기
            check: termDescriptionNode.classList.contains('check') // 완료 여부
        };
        saveItems.push(termObj); // 배열에 용어 객체 추가
    }

    console.log(JSON.stringify(saveItems)); // JSON 문자열로 변환하여 콘솔에 출력

    // 로컬 스토리지에 저장
    localStorage.setItem('termlist', JSON.stringify(saveItems));
}

function addTermList(savedTerm) { // 새로운 용어 항목을 추가

    const listArea = document.querySelector(".listArea");

    // 새로운 리스트 항목(li) 요소와 그 자식 요소들 생성
    const liNode = document.createElement("li");
    const checkBtn = document.createElement("button");
    const termDescriptionText = document.createElement("span");
    const delBtn = document.createElement("button");

    // 자식 요소들을 리스트 항목(li)에 추가
    liNode.appendChild(checkBtn);
    liNode.appendChild(termDescriptionText);
    liNode.appendChild(delBtn);
    listArea.appendChild(liNode);
    
    // 저장된 용어 항목이 있으면 해당 데이터를 사용하여 텍스트와 클래스 설정
    if (savedTerm) {
        termDescriptionText.innerHTML = `${savedTerm.term}<br>${savedTerm.description}`;
        termDescriptionText.dataset.term = savedTerm.term;
        termDescriptionText.dataset.description = savedTerm.description;
        if (savedTerm.check) {
            termDescriptionText.classList.add("check");
        }
    } else {
       // 새로운 용어 항목이면 입력 필드의 값을 사용
       const termInput = document.querySelector("#termInput");
       const descriptionInput = document.querySelector("#descriptionInput");
       
       termDescriptionText.innerHTML = `${termInput.value}<br>${descriptionInput.value}`;
       termDescriptionText.dataset.term = termInput.value;
       termDescriptionText.dataset.description = descriptionInput.value;
       
       termInput.value = ""; // 입력 필드 초기화
       descriptionInput.value = ""; // 설명 필드 초기화
    }

    // 삭제 버튼 텍스트 설정
    delBtn.innerText = "X";

    // 클래스 추가
    checkBtn.classList.add("checkBtn");
    termDescriptionText.classList.add("termDescriptionText");
    delBtn.classList.add("delBtn");

    // 항목이 추가될 때마다 저장
    saveItems();

    // 체크 버튼 클릭 이벤트 리스너 추가
    checkBtn.addEventListener("click", function () {
        // 체크 표시 토글
        if (checkBtn.innerHTML == "") {
            checkBtn.innerHTML = "✔";
        } else {
            checkBtn.innerHTML = "";
        }
        // 용어 텍스트에 'check' 클래스 토글
        termDescriptionText.classList.toggle("check");
        saveItems(); // 변경 사항 저장
    });

    // 삭제 버튼 클릭 이벤트 리스너 추가
    delBtn.addEventListener("click", function () {
        liNode.remove(); // 리스트 항목 제거
        saveItems(); // 변경 사항 저장
    });

    console.log(listArea.lastChild); // 마지막 추가된 자식 요소 콘솔에 출력
}
