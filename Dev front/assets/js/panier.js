const data = JSON.parse(localStorage.getItem('panier'))


if (data == null || data.length==0){
  const titre = document.createElement('h1');
  titre.classList.add('titre');
  titre.innerHTML = `<h1>Oops ! Votre panier est vide.</h1>`;
  console.log(document.body)
  document.body.appendChild(titre);
  console.log('test')
}
else{
console.log(data)
  document.addEventListener('DOMContentLoaded', () => {
    const panier = document.getElementById('panier');
    const tbody = document.createElement('tbody');
    console.log(panier)
    panier.appendChild(tbody);
    let totalPanier=0;
    data.products.forEach(product => {
      //Ajouter une ligne au tableau
      const tr = document.createElement('tr');
      tr.innerHTML = `<th scope="row"><img src="${product.image}" alt="Image du produit ${product.name}" style="width: 30%;">${product.name}</th>
      <td class="align-middle">${formatPrice(product.price)}</td>
      <td class="align-middle">
        <div class="input-group mb-3">
          <button class="btn btn-outline-secondary btn-panier-moins" data-price="${product.price}" type="button" id="button-addon1" data-id="${product.id}">-</button>
          <input type="text" class="form-control" value="${product.quantity}" aria-label="Example text with button addon" aria-describedby="button-addon1">
          <button class="btn btn-outline-secondary btn-panier-add" data-price="${product.price}" type="button" id="button-addon1"  data-id="${product.id}">+</button>
        </div>
      </td>
      <td class="align-middle">${formatPrice(product.price*product.quantity)}</td>
      <td class="align-middle"><button class="btn btn-danger btn-panier-suppr" data-price="${product.price}" data-id="${product.id}">Supprimer</button></td>`;
      totalPanier += product.quantity*product.price;
      
      tbody.appendChild(tr);
    });

    calculPrixPanier(totalPanier);

    const btns_add = document.querySelectorAll('.btn-panier-add')

    btns_add.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btn = e.target;
            const input = btn.parentElement.querySelector('input');
            input.value = parseInt(input.value) + 1; //on augmente la quantité de 1
            console.log(input.value);
            console.log(e.target.dataset);
            const idProduct = e.target.dataset.id
            product = data.products.find(product => product.id == idProduct)
            product.quantity = parseInt(input.value)
            const price = product.price //on peut récupérer le prix directement dans le localStorage et plus dans un data-price
            
            const totalPrixProduit = e.target.parentElement.parentElement.nextElementSibling;
            totalPrixProduit.innerHTML = `${formatPrice(parseInt(input.value) * parseFloat(price))}`;
            totalPanier+= parseFloat(price);
            calculPrixPanier(totalPanier);
            
        })
    })

    

    const btns_suppr = document.querySelectorAll('.btn-panier-suppr')

    btns_suppr.forEach(btn => {
      btn.addEventListener('click', (e) => {
          console.log('Bouton supprimer');
          const btn = e.target;
          const row = btn.parentElement.parentElement;
          console.log(row);
          
          const totalPrixProduit = row.querySelector('td:nth-child(4)').innerText;
          //console.log(row);
          const totalPrixSansDevise = totalPrixProduit.replace(' XPF','').replace(',','.');
          totalPanier -= parseFloat(totalPrixSansDevise);

          const idProduct = e.target.dataset.id
          console.log(e.target.dataset);
          product = data.products.find(product => product.id == idProduct)
          
          row.remove();
          
          //localStorage.removeItem(row);

          product = data.products.findIndex(product => product.id == idProduct);
          console.log(idProduct);
          data.products.splice(product, 1);
          console.log(localStorage);
          calculPrixPanier(totalPanier);
      })
  })

  const btns_moins = document.querySelectorAll('.btn-panier-moins')

  btns_moins.forEach(btn => {
      btn.addEventListener('click', (e) => {
          console.log('Bouton moins');
          console.log(e.target.dataset.price);
          const btn = e.target;
          const input = btn.parentElement.querySelector('input');
          if (input.value<=1){
            if (confirm("Voulez-vous supprimer cet élément ?")) {
                
                const row = btn.parentElement.parentElement.parentElement;
                console.log(row);
                const totalPrixProduit = row.querySelector('td:nth-child(4)').innerText;
                //console.log(row);
                const totalPrixSansDevise = totalPrixProduit.replace(' XPF','').replace(',','.');
                totalPanier -= parseFloat(totalPrixSansDevise);

                const idProduct = e.target.dataset.id
                console.log(e.target.dataset);
                product = data.products.find(product => product.id == idProduct)
                
                row.remove();
                
                //localStorage.removeItem(row);

                product = data.products.findIndex(product => product.id == idProduct);
                console.log(idProduct);
                data.products.splice(product, 1);
                console.log(localStorage);
                calculPrixPanier(totalPanier);
              } else {
                txt = "You pressed Cancel!";
              } 
            //alert("Voulez-vous supprimer cet élément ?")
        }
        
        else{
          const idProduct = e.target.dataset.id
          product = data.products.find(product => product.id == idProduct)
          product.quantity = parseInt(input.value)
          const price = product.price //on peut récupérer le prix directement dans le localStorage et plus dans un data-price
          input.value = parseInt(input.value) - 1; //on augmente la quantité de 1
          const totalPrixProduit = e.target.parentElement.parentElement.nextElementSibling;
          totalPrixProduit.innerHTML = `${formatPrice(parseInt(input.value) * parseFloat(price))}`;
          totalPanier-= parseFloat(price);
          calculPrixPanier(totalPanier);
        }
          //input.value = parseInt(input.value) - 1; //on augmente la quantité de 1
          console.log(input.value);
          //document.getElementById('PrixTotal').innerHTML = formatPrice(totalPanier);
      })
  })



  /*const btn_suppr_tout = document.querySelectorAll('.btn_suppr_tout')
  console.log(btn_suppr_tout)
    btn_suppr_tout.addEventListener('click', () => {
        const rows =  document.querySelectorAll('.class tbody');
        rows.remove();

        calculPrixPanier(totalPanier);
    })*/

    const btnToutSupprimer = document.getElementById('btn_suppr_tout');

    btnToutSupprimer.addEventListener('click', () => {
        console.log('Tout supprimer');
        const rows = document.querySelectorAll('.produit tbody');
        let totalPanier = 0;
        rows.forEach(row => {
            row.remove();
        });
        
        calculPrixPanier(totalPanier);
        localStorage.removeItem('panier');
    });
  });


  const formatPrice = (price) => {
    return price.toFixed(2).replace('.',',') + ' XPF';
  }


const calculPrixPanier = (totalPanier) =>{
  localStorage.setItem('panier', JSON.stringify(data));
  let fraisdelivraison= 200;
  let reduction = 0;

  document.getElementById('PrixTotal').innerHTML = formatPrice(totalPanier);
  
  if(totalPanier>8000){
    console.log(totalPanier);
    fraisdelivraison=0;
  }

  document.getElementById('montantTva').innerHTML = formatPrice((totalPanier+fraisdelivraison)*0.2);
  document.getElementById('fraislivraison').innerHTML = formatPrice(fraisdelivraison);
  document.getElementById('reduction').innerHTML = formatPrice(reduction);
  console.log(totalPanier);
  if (totalPanier===0){
    document.getElementById('TotalPayer').innerHTML = '0,00 XPF';
    const titre = document.createElement('h1');
    titre.classList.add('titre');
    titre.innerHTML = `<h1>Oops ! Votre panier est vide.</h1>`;
    document.body.appendChild(titre);
  }else{
    document.getElementById('TotalPayer').innerHTML = formatPrice(totalPanier + fraisdelivraison - reduction);
  }
  
}
}