const dessertWrapper = document.querySelector("#desserts-wrapper");
const cartInfo = document.getElementsByClassName("cart-info");

async function getProducts() {
  const data = await fetch("../data/data.json");
  const response = await data.json();
  addDesserts(response);
}

getProducts();

function addDesserts(desserts) {
  const dessertsHtml = desserts
    .map((dessert) => {
      const {
        image: { desktop },
        name,
        category,
        price,
      } = dessert;
      return `
  
            <article class="single-dessert">
            <div class="dessert-image">
              <img
                src="${desktop}"
              />
              <div class="add-to-cart">
                <button class="btn add-button">
                  <div class="add-to-cart-img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="20"
                      fill="none"
                      viewBox="0 0 21 20"
                    >
                      <g fill="#C73B0F" clip-path="url(#a)">
                        <path
                          d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"
                        />
                        <path
                          d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"
                        />
                      </g>
                      <defs>
                        <clipPath id="a">
                          <path fill="#fff" d="M.333 0h20v20h-20z" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span class="button-text">Add to Cart</span>
                </button>
              </div>
            </div>

            <div class="dessert-info">
              <h3 class="dessert-name">${category}</h3>
              <p class="dessert-text">${name}</p>
              <h4 class="dessert-price">$${price.toFixed(2)}</h4>
            </div>
          </article>
  
  `;
    })
    .join("");
  dessertWrapper.innerHTML = dessertsHtml;
  getAddBtn();
  add();
  showConfirmation();
  newOrder();
}

function getAddBtn() {
  const addBtn = Array.from(document.getElementsByClassName("add-to-cart"));
  addBtn.forEach((btn) => btn.addEventListener("click", getChild));
}

function getChild(e) {
  const target = e.currentTarget; // Use e.currentTarget to reference the clicked button
  while (target.firstChild) {
    target.removeChild(target.firstChild); // Remove all child nodes
  }
  target.appendChild(addOption()); // Add new options
}

let j = 0;
function addOption() {
  const options = document.createElement("div");
  options.classList.add("options");
  const decrementId = `decrement-${j}`;
  const incrementId = `increment-${j}`;
  j++;
  options.innerHTML = `
    <input type="checkbox" id="${decrementId}" class="decrement" />
    <label for="${decrementId}" class="custom-checkbox">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        fill="hsl(20, 50%, 98%)"
        viewBox="0 0 10 2"
      >
        <path fill="#currentColor" d="M0 .375h10v1.25H0V.375Z" />
      </svg>
    </label>

    <div class="count">1</div>

    <input type="checkbox" id="${incrementId}" class="increment" />
    <label for="${incrementId}" class="custom-checkbox">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        fill="hsl(20, 50%, 98%)"
        viewBox="0 0 10 10"
      >
        <path
          fill="#currentColor"
          d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
        />
      </svg>
    </label>
  `;
  return options;
}

function add() {
  const change = Array.from(document.getElementsByClassName("add-button"));
  change.forEach((item) => item.addEventListener("click", addToCart));
}

function addToCart() {
  const cart = document.querySelector(".cart");
  const emptyCart = cart.querySelector(".empty-cart-img");
  const totalWrapper = document.querySelector(".total-wrapper");
  cart.setAttribute("id", "cart-bg");
  if (emptyCart) {
    cart.removeChild(emptyCart);
    selectedItem();
  } else {
    selectedItem();
  }
  if (totalWrapper.classList.contains("hide")) {
    totalWrapper.classList.toggle("hide");
  }
}

function selectedItem() {
  const div = document.createElement("div");
  div.classList.add("selected");
  div.innerHTML = `
          <div class="selected-items">
          <div class="single-item">
            <div class="single-item-info">
              <h4 class="single-item-name">Classic Titramisu</h4>
              <div class="single-item-prices">
                <h4 class="qty">1x</h4>
                <span class="single-price">@$5.50</span>
                <span class="single-item-total">$5.50</span>
              </div>
            </div>
            <div class="delete-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="#CAAFA7"
                  d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                />
              </svg>
            </div>
          </div>
        </div>
  `;
  cartInfo[0].appendChild(div);
}

const confirm = document.querySelector(".confirmation");
const confirmBtn = document.querySelector(".confirm-btn");
const newBtn = document.querySelector(".new-order");

function showConfirmation() {
  confirmBtn.addEventListener("click", popUp);
}

function popUp() {
  if (confirm.classList.contains("hide")) {
    confirm.classList.remove("hide");
  }
}

function newOrder() {
  newBtn.addEventListener("click", startNewOrder);
}

function startNewOrder() {
  if (!confirm.classList.contains("hide")) {
    confirm.classList.add("hide");
  }
}

// const dessertWrapper = document.querySelector("#desserts-wrapper");
// const cartInfo = document.getElementsByClassName("cart-info")[0]; // Ensure cartInfo[0] is used correctly

// async function getProducts() {
//   const data = await fetch("../data/data.json");
//   const response = await data.json();
//   addDesserts(response);
// }

// getProducts();

// function addDesserts(desserts) {
//   const dessertsHtml = desserts
//     .map((dessert) => {
//       const {
//         image: { desktop },
//         name,
//         category,
//         price,
//       } = dessert;
//       return `
//         <article class="single-dessert">
//           <div class="dessert-image">
//             <img src="${desktop}" />
//             <div class="add-to-cart">
//               <button class="btn add-button">
//                 <div class="add-to-cart-img">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
//                     <g fill="#C73B0F" clip-path="url(#a)">
//                       <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
//                       <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
//                     </g>
//                     <defs>
//                       <clipPath id="a">
//                         <path fill="#fff" d="M.333 0h20v20h-20z" />
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </div>
//                 <span class="button-text">Add to Cart</span>
//               </button>
//             </div>
//           </div>
//           <div class="dessert-info">
//             <h3 class="dessert-name">${category}</h3>
//             <p class="dessert-text">${name}</p>
//             <h4 class="dessert-price">$${price.toFixed(2)}</h4>
//           </div>
//         </article>
//       `;
//     })
//     .join("");
//   dessertWrapper.innerHTML = dessertsHtml;
//   getAddBtn();
//   showConfirmation();
//   newOrder();
// }

// function getAddBtn() {
//   const addBtn = Array.from(document.getElementsByClassName("add-button"));
//   addBtn.forEach((btn) => btn.addEventListener("click", handleAddButtonClick));
// }

// function handleAddButtonClick(e) {
//   const button = e.currentTarget;
//   const itemParent = button.closest(".single-dessert");
//   const itemName = itemParent.querySelector(".dessert-text").textContent;
//   const itemPrice = parseFloat(
//     itemParent.querySelector(".dessert-price").textContent.replace("$", "")
//   );
//   const qty = 1;
//   const itemTotalPrice = qty * itemPrice;

//   selectedItem({ itemName, itemPrice, qty, itemTotalPrice });
// }

// function selectedItem({ itemName, itemPrice, qty, itemTotalPrice }) {
//   const div = document.createElement("div");
//   div.classList.add("selected");
//   div.innerHTML = `
//     <div class="selected-items">
//       <div class="single-item">
//         <div class="single-item-info">
//           <h4 class="single-item-name">${itemName}</h4>
//           <div class="single-item-prices">
//             <h4 class="qty">${qty}x</h4>
//             <span class="single-price">@${itemPrice.toFixed(2)}</span>
//             <span class="single-item-total">$${itemTotalPrice.toFixed(2)}</span>
//           </div>
//         </div>
//         <div class="delete-icon">
//           <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
//             <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   `;
//   cartInfo.appendChild(div);
// }

// const confirm = document.querySelector(".confirmation");
// const confirmBtn = document.querySelector(".confirm-btn");
// const newBtn = document.querySelector(".new-order");

// function showConfirmation() {
//   confirmBtn.addEventListener("click", () => {
//     confirm.classList.remove("hide");
//   });
// }

// function newOrder() {
//   newBtn.addEventListener("click", () => {
//     confirm.classList.add("hide");
//   });
// }
