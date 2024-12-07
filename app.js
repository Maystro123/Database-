// Fonction pour afficher les notifications
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';

    // Masquer la notification après 3 secondes
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Fonction pour enregistrer un utilisateur
function signupUser (name, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (users[email]) {
        showNotification("Email déjà utilisé. Veuillez essayer avec un autre.", "error");
        return false;
    }

    users[email] = { name, password };
    localStorage.setItem('users', JSON.stringify(users));
    showNotification("Inscription réussie ! Vous pouvez maintenant vous connecter.", "success");
    window.location.href = 'login.html';
}

// Fonction pour connecter un utilisateur
function loginUser (email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email] && users[email].password === password) {
        showNotification(`Connexion réussie ! Bienvenue ${users[email].name}`, "success");
        window.location.href = 'index.html';
    } else {
        showNotification("E-mail ou mot de passe incorrect.", "error");
    }
}

// Gestion des événements pour le formulaire d'inscription
document.getElementById('signupForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signupUser (name, email, password);
});

// Gestion des événements pour le formulaire de connexion
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
    loginUser (email, password);
});