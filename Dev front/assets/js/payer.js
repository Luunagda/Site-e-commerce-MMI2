const data = JSON.parse(localStorage.getItem('panier'))
console.log(data)
  document.addEventListener('DOMContentLoaded', () => {
    const panier = document.getElementById('panier');
    console.log(data)
    const tbody = document.createElement('tbody');
    
    panier.appendChild(tbody);
    let totalPanier=0;
    data.products.forEach(product => {
      //Ajouter une ligne au tableau
      const tr = document.createElement('tr');
      tr.innerHTML = `<th scope="row"><img src="${product.image}" alt="Image du produit ${product.name}" style="width: 30%;">${product.name}</th>
      <td class="align-middle">${formatPrice(product.price)}</td>
      <td class="align-middle">${product.quantity}</td>
      <td class="align-middle">${formatPrice(product.price*product.quantity)}</td>`;
      totalPanier += product.quantity*product.price;
      tbody.appendChild(tr);
    });
    
 

    const btnToutSupprimer = document.getElementById('btn_suppr_tout');

    btnToutSupprimer.addEventListener('click', () => {
        console.log('Tout supprimer');
        const rows = document.querySelectorAll('.produit tbody');
        let totalPanier = 0;
        rows.forEach(row => {
            row.remove();
        });
        
        localStorage.removeItem('panier');
    });
  });


  const formatPrice = (price) => {
    return price.toFixed(2).replace('.',',') + ' XPF';
  }
  totalProduit = () => {
    nbProduits = 0;
    panier.products.forEach(product => {
        nbProduits += product.quantity;
    })
    document.getElementById('nb').innerText = nbProduits;
}