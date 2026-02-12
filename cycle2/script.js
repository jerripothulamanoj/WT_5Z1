let itemCount = 3;

function generateNumber() {
    const random = Math.floor(Math.random() * 100) + 1;
    document.getElementById("randomNumber").textContent = random;
}

function addItem() {
    itemCount++;
    const li = document.createElement("li");
    li.textContent = "Item " + itemCount;
    document.getElementById("itemList").appendChild(li);
}

function removeItem() {
    const list = document.getElementById("itemList");

    if (list.children.length > 0) {
        list.removeChild(list.lastElementChild);
        itemCount--;
    }
}
