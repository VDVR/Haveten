function toggleDropdown(id) {
    const dropdownContent = document.getElementById(id);
    const dropdownButton = dropdownContent.previousElementSibling;
    const arrow = dropdownButton.querySelector('.arrow');
    
    if (dropdownContent.classList.contains("show")) {
    dropdownContent.classList.remove("show");
    arrow.classList.remove("rotate");
    setTimeout(() => { dropdownContent.style.display = "none"; }, 
   300);
    } else {
    dropdownContent.style.display = "block";
    setTimeout(() => { dropdownContent.classList.add("show"); 
   arrow.classList.add("rotate"); }, 10);
    }
   }
   function selectOption(type, option) {
    const dropdownId = type + 'Dropdown';
    const tagContainer = document.querySelector(`#${dropdownId} 
   .selected-options`);
    
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.innerText = option;
    
    const closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    closeBtn.innerText = "x";
    closeBtn.onclick = function() {
    tag.remove();
    };
    tag.appendChild(closeBtn);
    tagContainer.appendChild(tag);
    closeAllDropdowns();
   }
   function closeAllDropdowns() {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
    let openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
    openDropdown.classList.remove('show');
    const arrow = 
   openDropdown.previousElementSibling.querySelector('.arrow');
    arrow.classList.remove("rotate");
    setTimeout(() => { openDropdown.style.display = "none"; 
   }, 300);
    }
    }
   }
   window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
    closeAllDropdowns();
    }
}