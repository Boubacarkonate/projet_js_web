// Récupération des pièces depuis le fichier JSON => importation des données du fichier json
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();
console.log(reponse);
console.log(pieces);

//index des pièces dans le tableau json
// const article = pieces[4];
for (let i = 0; i < pieces.length; i++) {
const article = pieces[i];                      // ce qui signifiedans premier temps pieces[0], ensuite pieces[1], pieces[2]... => i remplace l'index
                                                //si je mets pieces[1] alors on va boucler sur le même article à l'index 1     
    


//1-  créer les futurs balises qui seront rattachés à l'html à partir du js 
const pieceElement = document.createElement("article")
const imageElement = document.createElement("img");
imageElement.src = article.image;

const nomElement = document.createElement("h2")
nomElement.innerText = article.nom;

const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;      //écriture concaténée de la forme ci-dessous ${article.prix}
//prixElement.innerText = "Prix" + article.prix + " €";

const categorieElement = document.createElement('p');
categorieElement.innerText = article.categorie ?? ("aucune catégorie");   // ?? c'est le nullish pour dire qu'une valeur est null.
const descriptionElement = document.createElement('p');
descriptionElement.innerText = article.description ?? ("aucune description pour le moment");
const stockElement = document.createElement('p');
stockElement.innerText = article.disponibilite ? ("en stock") : ("non disponible")
// 2- rattacher les éléments créés, dits enfants, au parent qui est la balise class .fiches

const sectionFiches = document.querySelector(".fiches");
sectionFiches.appendChild(pieceElement)
pieceElement.appendChild(imageElement);
pieceElement.appendChild(nomElement);
pieceElement.appendChild(prixElement);
pieceElement.appendChild(categorieElement);
pieceElement.appendChild(descriptionElement);
pieceElement.appendChild(stockElement);

}

//gestion des boutons filtres

const boutonTrier = document.querySelector(".btn-trier")

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);         //Array.from(variable) permet de créer un nouvel objet en mode tableau pour qu'il puisse être itérable
    piecesOrdonnees.sort(function (a, b) {              //pour trier les éléments d'un Array
        return a.prix - b.prix;
     });
     console.log(piecesOrdonnees);
 });

/*array.sort() => trie les éléments selon la valeur unicode de chaque caractère
si la méthode sort() prend un paramètre => array.sort(function(a,b){
    return a - b     => tri dans un ordre croissant
    return a - b    => tri dans un ordre décroissant
})
*/

const boutonFiltrer = document.querySelector(".btn-filtrer")

boutonFiltrer.addEventListener("click", function (){
   const piecesFiltrees = pieces.filter(function (piece){           //La méthode filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction
    return piece.prix <= 35
   })
   console.log(piecesFiltrees);
})

/* 
Pour filtrer les éléments d’une liste, nous allons utiliser la fonction filter. Elle prend en argument une fonction anonyme qui sera appelée une fois par élément de la liste. La fonction anonyme prend un paramètre : l’élément à tester, qui se trouvera ou non dans la liste filtrée.
La fonction anonyme doit retourner une valeur booléenne :
true si l’élément doit se trouver dans la liste filtrée ;
false si l’élément ne doit pas se trouver dans la liste filtrée.
Dans notre exemple, le fichier JSON contient l’information du prix du produit.
 */