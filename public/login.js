document.getElementById('signInForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('password', document.getElementById('password').value); 
    formData.append('profile_picture', document.getElementById('profile_picture').files[0]);

    const id = sessionStorage.getItem('updateId');
    const url = id ? `/api/users/${id}` : '/api/users/register';
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
      method,
      body: formData
    })
    .then(res => {
      if (!res.ok) throw new Error('Request failed');
      return res.text();
    })
    .then(() => {
      alert(id ? "User updated!" : "Registration successful!");
      loadUsers();
      document.getElementById('signInForm').reset();
      sessionStorage.removeItem('updateId');
    })
    .catch(err => {
      console.error(err);
      alert('Error submitting form');
    });
  });
function loadUsers() {
  fetch('/api/users')
    .then(res => res.json())
    .then(users => {
      const userList = document.getElementById('userList');
      userList.innerHTML = ''; 

      users.forEach(user => {
        const div = document.createElement('div');
        div.className = 'bg-white rounded shadow p-4 flex items-center gap-4';

        div.innerHTML = `
          <img src="/uploads/${user.profile_picture}" width="50" height="50" class="rounded-full object-cover">
          <div class="flex-1">
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
          </div>
          <button onclick="deleteUser(${user.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          <button onclick="prefillUpdateForm(${user.id}, '${user.name}', '${user.email}', '${user.phone}')" class="bg-green-700 text-white px-2 py-1 rounded">Update</button>
        `;

        userList.appendChild(div);
      });
    });
}

function deleteUser(id) {
  if (!confirm('Are you sure you want to delete this user?')) return;

  fetch(`/api/users/${id}`, {
    method: 'DELETE'
  })
  .then(() => {
    loadUsers(); 
  })
  .catch(err => alert('Error deleting user'));
}

function prefillUpdateForm(id, name, email, phone) {
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;
    sessionStorage.setItem('updateId', id);
  }
window.onload = loadUsers;