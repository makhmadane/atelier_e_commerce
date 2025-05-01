let tabProduits = [
    { id: 1, libelle: "Asus Rog", prix: 310000, stock: 0, photo: "img/image1.jpg" },
    { id: 2, libelle: "Asus Rog Flow", prix: 280000, stock: 8, photo: "img/image2.jpg" },
    { id: 3, libelle: "Asus Rog", prix: 260000, stock: 25, photo: "img/image3.jpg" },
    { id: 4, libelle: "Gaming Pack", prix: 100000, stock: 15, photo: "img/image4.jpg" },
    
];
let tabPanier = [];
let contenuPanier = document.getElementById("contenuPanier");
let contenuFactureProduit = document.getElementById("contenuFactureProduit");
let article = document.getElementById("articles");
displayProducts(tabProduits);


function generatePDF(){
    let element = document.getElementById('infoPdf');

    var opt = {
      margin:       1,
      filename:     'facture.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
     
    html2pdf().from(element).set(opt).save();
}
function printFacture(){
    let nom = document.getElementById('nom_complet').value;
    let age = document.getElementById('age').value;
    let email = document.getElementById('email').value;
    let tel = document.getElementById('tel').value;

    document.getElementById('infoClient').innerHTML = 
    `
        <tr>
            <td>${nom}</td>
            <td>${age}</td>
            <td>${email}</td>
            <td>${tel}</td>
        </tr>
    `;
    contenuFactureProduit.innerHTML ="";
    let somme = 0;
    tabPanier.forEach((p,i) => {
        somme += p.prix * p.quantite;
        var ligne = `<tr>
                        <td>${p.libelle}</td>
                        <td>${p.quantite}</td>
                        <td>${p.prix * p.quantite}</td>
                    </tr>`
    contenuFactureProduit.innerHTML += ligne;
    });
    document.getElementById('totalFacture').innerText = somme + "FCFA";
}

function deleteProduct(id){
    let produit = tabProduits.find(p => p.id == id);
    produit.stock = produit.stock + tabPanier.filter(p => p.id == id)[0].quantite;

    tabPanier = tabPanier.filter(p => p.id != id);
    
    displayPanier();
    displayProducts(tabProduits);

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
    if(tabPanier.length === 0){
        contenuPanier.innerHTML = "Votre panier est vide."
    }else{
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
        });
    }
  
    document.getElementById('total').innerText = somme + "FCFA";

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