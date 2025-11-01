// Tableau pour stocker les numéros de facture déjà validés
var numerosFactureValides = [];

// Dictionnaire code → libellé
const comptesLibelles = {
    "111.": "Capital social ou personnel",
    "1111.": "Capital social",
    "1112.": "Fonds de dotation",
    "1117.": "Capital personnel",
    "11171.": "Capital individuel",
    "11175.": "Compte de l'exploitant",
    "112.": "Primes d'émission, de fusion et d'apport",
    "113.": "Ecarts de réévaluation",
    "114.": "Réserve légale",
    "115.": "Autres réserves",
    "119.": "Résultat net de l'exercice",
    "141.": "Emprunts obligataires",
    "1511.": "Provisions pour litiges",
    "1601.": "Comptes de liaison du siège",
    "1720.": "Diminution des dettes de financement"
};

function enregistrerAchat() {
    const journal = document.getElementById("journal-achat").value;
    const date = document.getElementById("date-achat").value;
    const fournisseur = document.getElementById("fournisseur-achat").value;
    const compteCharge = document.getElementById("compte-comptable").value; // ex : 601
    const numFacture = document.getElementById("num-facture").value;
    const ht = parseFloat(document.getElementById("ht-achat").value);
    const tva = parseFloat(document.getElementById("tva-achat").value);
    const ttc = ht * (1 + tva / 100);
// Réinitialisation des champs
document.getElementById("champs-supplementaires").innerHTML = "";
document.getElementById("journal-achat").value = "";
// 💾 Sauvegarde automatique dans le navigateur
localStorage.setItem("factures", document.querySelector("#table-achats tbody").innerHTML);
localStorage.setItem("ecritures", document.querySelector("#table-ecritures tbody").innerHTML);

    if (!journal || !date || !fournisseur || !compteCharge || !numFacture || isNaN(ht) || isNaN(tva)) {
        alert("Merci de remplir tous les champs.");
        return;
    }

    const table = document.getElementById("table-achats").getElementsByTagName('tbody')[0];

    // 1. Débit compte charge
    let row1 = table.insertRow();
    row1.insertCell(0).innerText = journal;
    row1.insertCell(1).innerText = date;
    row1.insertCell(2).innerText = fournisseur;
    row1.insertCell(3).innerText = numFacture;
    row1.insertCell(4).innerText = compteCharge;
    row1.insertCell(5).innerText = ht.toFixed(2); // Débit
    row1.insertCell(6).innerText = "";            // Crédit

    // 2. Débit TVA récupérable
    let row2 = table.insertRow();
    row2.insertCell(0).innerText = journal;
    row2.insertCell(1).innerText = date;
    row2.insertCell(2).innerText = "TVA déductible";
    row2.insertCell(3).innerText = numFacture;
    row2.insertCell(4).innerText = "3455";       // TVA récupérable
    row2.insertCell(5).innerText = (ht * tva / 100).toFixed(2);
    row2.insertCell(6).innerText = "";

    // 3. Crédit Fournisseur
    let row3 = table.insertRow();
    row3.insertCell(0).innerText = journal;
    row3.insertCell(1).innerText = date;
    row3.insertCell(2).innerText = fournisseur;
    row3.insertCell(3).innerText = numFacture;
    row3.insertCell(4).innerText = "4411";       // Compte fournisseur
    row3.insertCell(5).innerText = "";          // Débit
    row3.insertCell(6).innerText = ttc.toFixed(2); // Crédit
}

    // Trouver le libellé du compte
    const libelleCompte = comptesLibelles[compte.trim()] || "Libellé inconnu";

    const table = document.getElementById("table-achats").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();    }

    // Vérifier doublon numéro de facture
    if (numerosFactureValides.includes(numFacture)) {
        alert("Ce numéro de facture a déjà été enregistré.");
        return;
    }

    // Calculer TTC
    var ttcAchat = htAchat * (1 + tvaAchat / 100);
    document.getElementById('ttc-achat').value = ttcAchat.toFixed(2);

    // Chercher le libellé du compte
    var libelleCompte = comptesLibelles[compte] || "Libellé inconnu";

    // Ajouter la ligne au tableau
    var table = document.getElementById("table-achats").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow();

     newRow.insertCell(0).innerText = journal;
    newRow.insertCell(1).innerText = date;
    newRow.insertCell(2).innerText = fournisseur;
    newRow.insertCell(3).innerText = compte;              // Code compte
    newRow.insertCell(4).innerText = numFacture;
    newRow.insertCell(5).innerText = ht.toFixed(2);
    newRow.insertCell(6).innerText = tva.toFixed(2) + " %";
    newRow.insertCell(7).innerText = ttc.toFixed(2);
    newRow.insertCell(8).innerText = libelleCompte;       // Libellé du compte

    // Cellule actions
    var cellActions = newRow.insertCell(8);

    var btnModifier = document.createElement("button");
    btnModifier.textContent = "Modifier";
    btnModifier.addEventListener("click", function() {
        alert("Fonction modifier à implémenter");
    });
    cellActions.appendChild(btnModifier);

    var btnValider = document.createElement("button");
    btnValider.textContent = "Valider";
    btnValider.addEventListener("click", function() {
        numerosFactureValides.push(numFacture);
        btnValider.disabled = true;
        alert("Facture validée !");
    });
    cellActions.appendChild(btnValider);

    var btnSupprimer = document.createElement("button");
    btnSupprimer.textContent = "Supprimer";
    btnSupprimer.addEventListener("click", function() {
        newRow.remove();
        majTotaux();
    });
    cellActions.appendChild(btnSupprimer);

    // Mettre à jour les totaux
    majTotaux();

    // Effacer les champs
    document.getElementById('date-achat').value = '';
    document.getElementById('fournisseur-achat').value = '';
    document.getElementById('num-facture').value = '';
    document.getElementById('ht-achat').value = '';
    document.getElementById('tva-achat').value = '';
    document.getElementById('ttc-achat').value = '';
    document.getElementById('compte-comptable').value = '';
}

function calculerTTC() {
    const ht = parseFloat(document.getElementById("ht-achat").value) || 0;
    const tva = parseFloat(document.getElementById("tva-achat").value) || 0;
    const ttc = ht * (1 + tva / 100);
    document.getElementById("ttc-achat").value = ttc.toFixed(2);
}

document.getElementById("ht-achat").addEventListener("input", calculerTTC);
document.getElementById("tva-achat").addEventListener("change", calculerTTC);

function majTotaux() {
    let totalHT = 0, totalTVA = 0, totalTTC = 0;
    const rows = document.querySelectorAll("#table-achats tbody tr");
    rows.forEach(r => {
        const ht = parseFloat(r.cells[5].innerText) || 0;
        const tvaPourcent = parseFloat(r.cells[6].innerText) || 0;
        const ttc = parseFloat(r.cells[7].innerText) || 0;
        totalHT += ht;
        totalTVA += (ht * tvaPourcent / 100);
        totalTTC += ttc;
    });
    document.getElementById("total-ht").innerText = totalHT.toFixed(2);
    document.getElementById("total-tva").innerText = totalTVA.toFixed(2);
    document.getElementById("total-ttc").innerText = totalTTC.toFixed(2);
}
