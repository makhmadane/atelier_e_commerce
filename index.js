let tabProduits = [
    { id: 1, libelle: "Asus Rog", prix: 310000, stock: 0, photo: "img/image1.jpg" },
    { id: 2, libelle: "Asus Rog Flow", prix: 280000, stock: 8, photo: "img/image2.jpg" },
    { id: 3, libelle: "Asus Rog", prix: 260000, stock: 25, photo: "img/image3.jpg" },
    { id: 4, libelle: "Gaming Pack", prix: 100000, stock: 15, photo: "img/image4.jpg" },
    
];
let tabPanier = [];
let contenuPanier = document.getElementById("contenuPanier");
let article = document.getElementById("articles");
displayProducts(tabProduits);


function deleteProduct(id){

    tabPanier = tabPanier.filter(p => p.id != id);
    
    displayPanier();

}

function ajoutPanier(id){

        let produit = tabProduits.find(p => p.id == id);
        if(produit.stock>0){
             let exist = tabPanier.find(p => p.id == id);

             if(exist){
                exist.quantite++;
             }else{
                produit.quantite = 1;
                tabPanier.push(produit);

             }
            produit.stock --;
        }else{
            alert("Nous n'avons plus ce produit en stock.")
        }
        displayProducts(tabProduits);

}


function displayPanier(){
    contenuPanier.innerHTML = "";
    let somme = 0;
    tabPanier.forEach((p,i) => {
        somme += p.prix * p.quantite;
        var ligne = `<tr>
                        <td><img class="card-img-top" src="${p.photo}" alt="Card image cap"></td>
                        <td>${p.libelle}</td>
                        <td>${p.quantite}</td>
                        <td>${p.prix}</td>
                        <td>${p.prix * p.quantite}</td>
                        <td>
                            <button class="btn btn-secondary" onclick="deleteProduct('${p.id}')"> Delete </button>
                        </td>
                    </tr>`
    contenuPanier.innerHTML += ligne;
    document.getElementById('total').innerText = somme + "FCFA";
    });

}


function displayProducts(tabProduits){

    article.innerHTML ="";

    tabProduits.forEach((p,i) => {

      var card = `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${p.photo}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${p.libelle}</h5>
            <p class="card-text">${p.stock} -- Prix: ${p.prix} FCFA</p>
            <a href="#" class="btn btn-primary" onclick ="ajoutPanier('${p.id}')">Ajout Panier</a>
        </div>
        </div>`
        article.innerHTML +=card;
    });
        
 

}