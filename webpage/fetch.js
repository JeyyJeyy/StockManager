fetch("data.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (products) {
        let placeholder = document.querySelector("#data-output");
        let out = "";
        for (let product of products) {
            let url;
            let date = product.date.replace(/\//gi, '_');
            let time = product.date.split('/');
            const date1 = Date.parse(time[1] + ' ' + time[0] + ' ' + time[2])
            const date2 = Date.now();
            const diffTime = Math.abs(date2 - date1);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays == 0 || diffDays == 1) {
                diffDays = 'aujourd\'hui';
                url = 'equal.png';
            } else if (date1 <= date2) {
                diffDays = 'depuis ' + diffDays + ' jours';
                url = 'no.png';
            } else {
                diffDays = 'dans ' + diffDays + ' jours';
                url = 'ok.png';
            }
            out += `
         <tr>
            <td><img src='${url}'></td>
            <td style="font-size: 12px;"> <img style='border-radius: 15px; height: 150px; width: 150px; object-fit: contain;' src='${product.lien}'> <br> ${product.barcode} </td>
            <td>${product.nom}</td>
            <td>${product.date}<br>${diffDays}</td>
            <td>${product.quantity}</td>
            <td><button onclick="added(${product.barcode},${date})"><b>Ajouter</b></button><br><br><button onclick="delet(${product.barcode},${date})"><b>Supprimer</b></button><br><br><button onclick="getinfos(${product.barcode},${date})"><b>Infos</b></button></td>
         </tr>
      `;
        }
        placeholder.innerHTML = out;
    });