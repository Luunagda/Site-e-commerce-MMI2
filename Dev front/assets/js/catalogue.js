let panier= {};
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('panier') === null){
        panier = { products: [] };
    } else {
        panier =  JSON.parse(localStorage.getItem('panier'));
        console.log(panier);
        totalProduit();
    }
    



    const div = document.getElementById('drop');
    panier.products.forEach(product => {
      //Ajouter une ligne au tableau
      console.log(product)
      const divdrop = document.createElement('div');
      divdrop.classList.add('dropdown-content');
      divdrop.innerHTML = `<th scope="row"><img src="${product.image}" alt="Image du produit ${product.name}" style="width: 30%;">${product.name}</th>
   
      <td class="align-middle">${formatPrice(product.price*product.quantity)}</td>`
     
      div.appendChild(divdrop);
    });







    const btns_add = document.querySelectorAll('.btn-panier-add')

    btns_add.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btn = e.target;
            const input = btn.parentElement.querySelector('input');
            input.value = parseInt(input.value) + 1; //on augmente la quantité de 1
            console.log(input.value);

            const idProduct = e.target.dataset.id
            console.log(panier.products);
            //product = panier.products.find(product => product.id == idProduct)
            //product.quantity = parseInt(input.value)
            const product = panier.products.find(product => product.id === e.target.dataset.id);
            console.log(e.target.dataset);
            //const price = product.price //on peut récupérer le prix directement dans le localStorage et plus dans un data-price
            
            //const totalPrixProduit = e.target.parentElement.parentElement.nextElementSibling;
            //totalPrixProduit.innerHTML = `${formatPrice(parseInt(input.value) * parseFloat(price))}`;
            //totalPanier+= parseFloat(price);
            //calculPrixPanier(totalPanier);
            
        })
    })

    const btns_moins = document.querySelectorAll('.btn-panier-moins')

    btns_moins.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log('Bouton moins');
            //console.l"cog(e.target.dataset.price);
            const btn = e.target;
            const input = btn.parentElement.querySelector('input');
            if (input.value<=1){
                if (confirm("Voulez-vous supprimer cet élément ?")) {
                    txt = "You pressed OK!";
                  } else {
                    txt = "You pressed Cancel!";
                  } 
                //alert("Voulez-vous supprimer cet élément ?")
            }
            
            else{
                input.value = parseInt(input.value) - 1; //on augmente la quantité de 1
            }
          
            const idProduct = e.target.dataset.id
            //product = panier.products.find(product => product.id == idProduct)
            //product.quantity = parseInt(input.value)
            //const price = product.price //on peut récupérer le prix directement dans le localStorage et plus dans un data-price

            
            
            const product = panier.products.find(product => product.id === e.target.dataset.id);
            //console.log(input.value);
            //const totalPrixProduit = e.target.parentElement.parentElement.nextElementSibling;
            //totalPrixProduit.innerHTML = `${formatPrice(parseInt(input.value) * parseFloat(price))}`;
            //totalPanier-= parseFloat(price);
            //calculPrixPanier(totalPanier);
            //document.getElementById('PrixTotal').innerHTML = formatPrice(totalPanier);
        })
    })

    const btns = document.querySelectorAll('.add-to-card');
    
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('click btn');
            document.getElementById('nb').innerText = parseInt(document.getElementById('nb').innerText) + 1;
            console.log(e.target.parentElement.parentElement.querySelector('img').src);
            const product = panier.products.find(product => product.id === e.target.dataset.id);
            /* ou product = panier.products.forEach(product =>{
                if(product.id === e.target.dataset.id) {
                    return product
                }
            })*/
            const input = btn.parentElement.querySelector('input');
            console.log(input.value)
            if(product !== undefined){
                product.quantity++;
            } else {
            const product = {
                id: e.target.dataset.id,
                name: e.target.parentElement.parentElement.querySelector('.card-title').innerText,
                price: parseFloat(e.target.parentElement.parentElement.querySelector('.price').innerText),
                quantity: parseFloat(input.value),
                image: e.target.parentElement.parentElement.parentElement.querySelector('img').src

            }
            panier.products.push(product);
            
            }
            console.log(panier)
            let totalPanier = 0;
            panier.products.forEach(product => {
                totalPanier += product.quantity;
            })
            
            totalProduit();
            localStorage.setItem('panier', JSON.stringify(panier));

        })
    })
    
});

totalProduit = () => {
    nbProduits = 0;
    panier.products.forEach(product => {
        nbProduits += product.quantity;
    })
    document.getElementById('nb').innerText = nbProduits;
}

const formatPrice = (price) => {
    return price.toFixed(2).replace('.',',') + ' XPF';
  }